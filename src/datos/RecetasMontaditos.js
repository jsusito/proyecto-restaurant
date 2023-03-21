import imagen1 from "./../images/carta/1.jpg" 
import imagen2 from "./../images/carta/2.jpg"
import imagen3 from "./../images/carta/3.jpg"
import imagen4 from "./../images/carta/4.jpg"


export function RecetasMontaditos() { return [
    {
        id:"1",
        description: "salmón con sésamo, pimentada, arrope",
        precio: "5.02",
        imagen: imagen1,
    },
    {
        
        id:"2",
        description: "Nachos con aguacate, nata y huevo",
        precio: "9",
        imagen: imagen2,
    },
    {
        id:"3",
        description: "Jamón con tomate",
        precio: "4",
        imagen: imagen3,
    },
    {
        id:"4",
        description: "pato caramelizado a la naranja",
        precio: "7",
        imagen: imagen4,
    },
]
}
