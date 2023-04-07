export class CookieMap{
    cookie;
    constructor(cookie){
        this.cookie = cookie;
        
    }

    getObjectCookie(){
        let cookieMap = this.cookie.split(';')
            .reduce((cookies, cookie) =>{
                const [name,value] = cookie.split('=').map(c=>c.trim()); 
                return {
                    ...cookies, 
                    [name]: value
                };
            }, {}
            );
        return cookieMap;
    }
}