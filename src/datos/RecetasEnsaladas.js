import imagen5 from "./../images/carta/5.jpg"
import imagen6 from "./../images/carta/6.jpg"
import imagen7 from "./../images/carta/7.jpg"
import imagen8 from "./../images/carta/8.jpg"



    export function RecetasEnsaladas(){ 
        return [
            {
                id:"5",
                description: "Granada, platano, kiwi con salsa de fresa",
                precio: "7",
                imagen: imagen5,
            },
            {
                
                id:"6",
                description: "pulpo salvaje salteados con piña ",
                precio: "6",
                imagen: imagen6,
            },
            {
                id:"7",
                description: "tomates, lechuga , aceitunas ...",
                precio: "9",
                imagen: imagen7,
            },
            {
                id:"8",
                description: "guacamole, mesclúm de brotes",
                precio: "12",
                imagen: imagen8,
            },
        ]
    }