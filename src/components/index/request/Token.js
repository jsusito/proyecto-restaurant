export class Token{
    user;
    password;
    token;
    loggedIn;

    constructor(user, password){
        this.user = user;
        this.password = password;
        this.loggedIn = false;
    }

    requestToken(){
        const timeExpiredToken = 60 * 3; // 3 minutos     
        let bodyLogin = {
            username: this.user,
            password: this.password
        }

        return fetch('http://localhost:8089/login', {
            method : 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyLogin)
        })
        .then(response => response.json())
        .then(response => {
            document.cookie = `token=${response.token};max-age=${timeExpiredToken};samesite=strict`;
            document.cookie = `user=${this.user};max-age=${timeExpiredToken};samesite=strict`;
            this.token = response.token;
            this.loggedIn = true;
            return response.token;
        })
        .catch(error => {
            console.error(error)
            this.loggedIn = false;
        });
    }
}
