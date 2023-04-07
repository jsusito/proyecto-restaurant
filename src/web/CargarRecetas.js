import { useEffect, useState } from "react";
import { ErrorConnection } from "../components/index/ErrorConnection";
import { Especialidad } from "../components/index/Especialidad";
import { NewReceta } from "../components/index/formularios/NewReceta";
import { SeccionEspecialidad } from "../components/index/SeccionEspecialidad";
import {Constants} from "../utils/Constants"


export function CargarRecetas(){
    
    const constants = new Constants();
    const [recetaResponse, setRecetaResponse] = useState([]);
    const [showFail, setShowFail] = useState(false)

    useEffect(() =>{
        fetch("http://localhost:8089/recetas/recetas", {
        method: 'GET',
        })
        .then(response => response.json())
        .then(body => setRecetaResponse(body))
        .catch(error=>(setShowFail(true)))
        },[])
    
    return(
        <> 
        
        { 
            recetaResponse && 
            <>
                <Especialidad title="recetas orientales">{recetaResponse.map(receta=>
                    (<SeccionEspecialidad 
                        key={receta.id}  
                        plato={receta.name} 
                        imagen={constants.API_IMAGE + receta.imagen}
                        ingredientes ={receta.ingredients}/>))}
                </Especialidad>
            </>        
        }

        { showFail && <ErrorConnection></ErrorConnection>}
        
        </>
    );
}