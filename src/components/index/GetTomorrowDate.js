export function GetTomorrowDate(){
    let mes = (new Date().getMonth() + 1).toString();
        if(mes.length < 2)
            mes = "0" + mes; 
        
        let day = new Date().getFullYear().toString() + "-" 
                     + mes + "-" 
                    + (new Date().getDate() + 1).toString();  
        return day;
}