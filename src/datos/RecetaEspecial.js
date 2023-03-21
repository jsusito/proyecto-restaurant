import especialidad1 from "./../images/carta/especialidad1.jpg"
import especialidad2 from "./../images/carta/especialidad2.jpg"
import especialidad3 from "./../images/carta/especialidad3.jpg"
import especialidad4 from "./../images/carta/especialidad4.jpg"
import especialidad5 from "./../images/carta/especialidad5.jpg"
import especialidad6 from "./../images/carta/especialidad6.jpg"
export function RecetaEspecial(){
    
    return [
        {
            id: 1,
            description: "tortitas con carne",
            imagen: especialidad1,
            ingredientes:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
            precio:17.99,
            text:"Delicia de  tortitas con carne"
        },
        {
            id: 2,
            description: "Arepa especial",
            imagen: especialidad2,
            ingredientes:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
            precio:17.99,
            text:"Prueba nuestras arepas, una explosión de sabores"
        },
        {
            id: 3,
            description: "postre tropical",
            imagen: especialidad3,
            ingredientes:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
            precio:17.99,
            text: "un maravilloso postre para disfrutar"
        },
        {
            id: 4,
            description: "Bacon relleno",
            imagen: especialidad4,
            ingredientes:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
            precio:17.99,
            text: "una experiencia inolvidable"
        },
        {
            id: 5,
            description: "bocadillo marinero",
            imagen: especialidad5,
            ingredientes:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
            precio:17.99,
            text: "pruebalo, desearás volver "
        },
        {
            id: 6,
            description: "carne en salsa viera",
            imagen: especialidad6,
            ingredientes:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
            precio:17.99,
            text: "de nuestros mejores platos disponibles"

        },    
    ]
}