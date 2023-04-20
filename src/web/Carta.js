import { useContext, useState } from "react";
import { UserContext } from "../components/index/authentication/UserSesion";
import { ComidaLLevar } from "../components/index/carta/ComidaLLevar";
import SeccionCarta from "../components/index/carta/SeccionCarta";
import { FormReservas } from "../components/index/formularios/FormReservas";
import { RecetasComida } from "../datos/RecetasComida";
import { RecetasEnsaladas } from "../datos/RecetasEnsaladas";
import { RecetasMontaditos } from "../datos/RecetasMontaditos";
import imgComidas from "../images/carta/comidas.jpg";
import imgEnsaladas from "../images/carta/ensaladas.jpg";
import imgMontaditos from "../images/carta/montaditos.jpg";

function Carta(){
  const [imagen , setImagen] = useState(imgMontaditos);
  const [imagenEnsalada , setImagenEnsalada] = useState(imgEnsaladas);
  const [imagenComida , setImagenComida] = useState(imgComidas);
  const [showForm, setShowForm] = useState(false);
  
  let context = useContext(UserContext);
  const authenticate = context.token;
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

                    { showForm && authenticate  && <FormReservas></FormReservas>}
                </>    
                
            }
        </div>
    )
}

export default Carta;