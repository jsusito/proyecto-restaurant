import vino from "./../images/carta/vino.jpg"
import refresco from "./../images/carta/refresco.jpg"
import zumos from "./../images/carta/zumos.jpg"
import cafe from "./../images/carta/cafe.jpg"

export function RecetaBebidas(){ 
        return [
            {
                id:"15",
                description: "refresco",
                precio: "2.50",
                imagen: refresco
                 
            },
            {
                
                id:"16",
                description: "vino",
                precio: "3",
                imagen: vino
            },
            {
                id:"17",
                description: "zumos",
                precio: "9",
                imagen: zumos
            },
            {
                id:"18",
                description: "infusion o cafe",
                precio: "12",
                imagen: cafe
            },
        ]
    }