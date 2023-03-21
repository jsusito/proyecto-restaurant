import {useState} from "react";
import SeccionCarta from "../components/index/carta/SeccionCarta";
import { RecetasMontaditos } from "../datos/RecetasMontaditos";
import { RecetasEnsaladas } from "../datos/RecetasEnsaladas";
import { RecetasComida } from "../datos/RecetasComida";
import imgMontaditos from "../images/carta/montaditos.jpg"
import imgEnsaladas from "../images/carta/ensaladas.jpg"
import imgComidas from "../images/carta/comidas.jpg"
import { ComidaLLevar } from "../components/index/carta/ComidaLLevar";
import { FormReservas } from "../components/index/formularios/FormReservas";

function Carta(){
  const [imagen , setImagen] = useState(imgMontaditos);
  const [imagenEnsalada , setImagenEnsalada] = useState(imgEnsaladas);
  const [imagenComida , setImagenComida] = useState(imgComidas);
  const [showForm, setShowForm] = useState(false);
    return(
        <div className="container-fluid background-carta-encabezado ">
            {
                <>
                     {
                        !showForm &&  <SeccionCarta 
                        header="Nuestros montaditos" 
                        tittle="montaditos de" recetas={RecetasMontaditos()}
                        valueState={imagen}
                        setValueState={setImagen}                   
                        />
                    }
                    {
                        !showForm &&  <SeccionCarta 
                        header="las ensaladas" 
                        tittle="Ensaladas de" recetas={RecetasEnsaladas()}
                        valueState={imagenEnsalada}
                        setValueState={setImagenEnsalada}                   
                        />
                    }
                    {
                        !showForm &&  <SeccionCarta 
                        header="mis platos" 
                        tittle="recetas de" recetas={RecetasComida()}
                        valueState={imagenComida}
                        setValueState={setImagenComida}                   
                        />
                    }
                    
                    { !showForm && <ComidaLLevar setValue={setShowForm} value={showForm}></ComidaLLevar>}

                    { showForm && <FormReservas></FormReservas>}
                </>    
                
            }
        </div>
    )
}

export default Carta;