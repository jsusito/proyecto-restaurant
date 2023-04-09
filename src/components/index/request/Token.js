import { Constants } from "../../../utils/Constants";

export class Token{
    user;
    password;
    token;
    loggedIn;
    statuscode;
    apiLogin

    constructor(user, password){
        this.user = user;
        this.password = password;
        this.loggedIn = false;
        this.apiLogin = new Constants().API_LOGIN;
    }

    requestToken(){
        const timeExpiredToken = new Constants().TIME_EXPIRED_TOKEN;    
        let bodyLogin = {
            username: this.user,
            password: this.password
        }

        return fetch(this.apiLogin, {
            method : 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyLogin)
        })
        .then(response => {
            this.statuscode = response.status;
            return response.json()})
        .then(response => {
            document.cookie = `token=${response.token};max-age=${timeExpiredToken};samesite=strict`;
            document.cookie = `user=${this.user};max-age=${timeExpiredToken};samesite=strict`;
            this.token = response.token;
            this.loggedIn = true;

            return response.token;
        })
        .catch(error => {
            this.loggedIn = false;
        });
    }
}
