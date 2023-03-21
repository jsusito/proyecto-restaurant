import { useState } from "react";
import image from "./../../images/bandeja.png"
import MapsDireccion from "./MapsDireccion";
import ParrafoAndHead from "./ParrafoAndHead";
import { RecetaEspecial } from "../../datos/RecetaEspecial"
import imagenActiva from "../../images/carta/6.jpg"


const datos = [
    {
        id:0,
        imagen: image,
        alt: "bandeja"
    },
    {
        id:1,
        header:"Un auténtico homenaje a los sentidos"
    },
    {
        id:2,
        parrafo:"Casandra es mucho más que un restaurante. Un templo de la gastronomía en el que disfrutarás de una sofisticada cocina de mercado basada en productos kilómetro cero."
    },
    {
        id:3,
        parrafo:"El mejor lugar en el que degustar los manjares de Lanzarote, diseñado para el deleite de tu paladar y atendido por un equipo de personas que te ofrecerán un servicio excelente. Los productos frescos y de temporada, fruto de la labor de los agricultores locales, son los protagonistas de los platos propuestos por nuestro equipo de cocina, siempre dispuesto a innovar."
    },
    {
        id:4,
        header:"EL ESPACIO"                       
    },
    {
        id:5,
        parrafo:"Nuestro restaurante forma parte de Casandra concept, un espacio ideado para que tu experiencia en  sea un auténtico homenaje a los sentidos. Hemos creado para ti un oasis de tranquilidad que aúna nuestra apuesta por el lujo sostenible y la búsqueda de la felicidad, desde un enfoque saludable."
    },
]

function IntroUsuario(){
    
    const [showMap, setShowMap] = useState(false);
        
    return(
        <div className="container introduccion" >
            <div className="row  justify-content-center">
                <div className="col-10">
                
                    {
                     datos.map(dato =>
                            (<ParrafoAndHead 
                                key = {dato.id}
                                imagen= {dato['imagen']}
                                alt = {dato['alt']}
                                header = {dato['header']} 
                                parrafo={dato['parrafo']}>
                            </ParrafoAndHead>))
                    }

                    <div className="col-12 d-flex justify-content-center align-items-center flex-column mb-3">    
                        <p>Ven a visitarnos. Estamos en <button className="enlaces mb-3" onClick={() =>setShowMap(true)}> calle el escondite 44. Arrecife</button></p>
                        
                        <div className="col-10">
                            { showMap && <MapsDireccion id="mapa"></MapsDireccion> }
                        </div>
                        
                        <ParrafoAndHead header="Nuestras especialidades"></ParrafoAndHead>
                        
                        <div id="carouselComida" className="carousel carousel-dark slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselComida" data-bs-slide-to="0" className="active"></button>
                                
                                {
                                    RecetaEspecial().map((receta)=>(<button key={receta.id} type="button" data-bs-target="#carouselComida" data-bs-slide-to={receta.id} />))    
                                        
                                }
                            </div>
                            <div className="carousel-inner">
                                
                                <div className="carousel-item active data-bs-interval=1000">
                                    <img src={imagenActiva} className="d-block  img-carrusel"  alt="..."/>
                                </div>
                                {
                                    RecetaEspecial().map((receta)=>
                                        <div key={receta.id} className="carousel-item data-bs-interval=5000">
                                            <img src={receta.imagen} className="d-block img-carrusel" alt="..."/>
                                        </div>   
                                    )
                                 }

                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselComida" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Anterior</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselComida" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Siguiente</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IntroUsuario;