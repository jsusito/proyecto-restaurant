import emailJS from "@emailjs/browser";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Constants } from "../../../utils/Constants";
import { GetTomorrowDate } from "../GetTomorrowDate";
import { UserContext } from "../authentication/UserSesion";
import { ConfirmSendForm } from "./ConfirmSendForm";
import { FailSendForm } from "./FailSendForm";
import { LabelInput } from "./LabelInput";
import { SelectForm } from "./SelectForm";


const optionMesa=["1","2","3","4","5","6","7","8"];
const horaAlmuerzo=["12:00","12:30","13:00","13:30","14:00"]
const horaCena=["19:00","20:00","21:00","22:00"]
const optionPersonas=[1,2,3,4,5,6]
const apiGetUser = new Constants().API_USER;

const labelFor =[
        {
           id:0,
           text: "nombre",
           type: "text",
           placeholder:"Mayor de 4 caractéres. Solo Letras",
           pattern : /^[a-zA-Z ]{5,}$/
               
        },
        {
            id:1,
            text: "apellido",
            type: "text",
            placeholder:"Tiene que ser mayour de 3 letras",
            pattern : /^[a-zA-Z ]{3,}$/     
            
        },
        {
            id:2,
            text: "telefono",
            type: "text",
            placeholder:"numero de 9 cifras o mayor",
            pattern : /^[?+?.0-9 ]{9,}$/   
         },
         {
            id:3,
            text:"fecha",
            type:"date",
            pattern : /[*]*/

            
        },
        {
            id:4,
            text:"email",
            type:"email",
            placeholder:"Introduzca un email válido",
            pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        },
        
        
];

export function FormReservas(){
        const [buttonDisable, setButtonDisable] = useState(true);
        
        //Contexto
        let context = useContext(UserContext);
        const authenticate = context.authenticate;
        const token = context.token
        const username = context.nameSesion;

        //input
        const [nombre, setNombre] = useState("");        
        const [apellido, setApellido] = useState("");        
        const [email, setEmail] = useState("");
        const [telefono, setTelefono] = useState("");
        const [personas, setPersonas] = useState("");
        const [date, setDate] = useState(GetTomorrowDate());
        
        labelFor[0].value = nombre;
        labelFor[0].setValue = setNombre;

        labelFor[1].value = apellido;
        labelFor[1].setValue = setApellido;

        labelFor[2].value = telefono;
        labelFor[2].setValue = setTelefono;

        labelFor[3].value = date;
        labelFor[3].setValue = setDate;
        labelFor[3].min = GetTomorrowDate();

        labelFor[4].value = email;
        labelFor[4].setValue = setEmail;
        
        //select
        const [mesa, setMesa] = useState("");
        const [almuerzo, setAlmuerzo] = useState("");
        const [cena, setCena] = useState("");
        
        const [reservaCompleta, setReservaCompleta] = useState(false);
        const [falloReserva, setFalloReserva] = useState(false);
        const form = useRef();
              
        //Manda el email y guardamos en base de datos la reserva. Verifica el formulario
        const sendEmail = (e) => {
            e.preventDefault();
                       
            const dataForm = {
                "numberPeople": personas,
                "lunchTable": mesa, 
                "dinnerTable": mesa,
                "lunchHour": almuerzo,
                "dinnerHour": cena,
                "userUsername": nombre,
                "dateReservations": date
            }

            let apiReservation = new Constants().API + "reservation";
            
            const saveData = () => {
                
                return new Promise((resolve, reject) => {
                  fetch(apiReservation,{
                    method:"POST",
                    headers:{
                      "Authorization": `Bearer ${token}`,    
                      'Content-type': 'application/json; charset=UTF-8'    
                    },
                    body: JSON.stringify(dataForm)
                  })
                  .then(response => resolve(response.status))
                  .catch(error => reject(error));
                });
              };
              
            const sendEmail = () => {
                
                return new Promise((resolve, reject) => {
                  emailJS.sendForm('service_t9kpq9j', 'template_cztccwg', form.current, 'UohhMdM_4_xf3jYXZ')
                    .then(response => {
                        setReservaCompleta(true);
                        setButtonDisable(true);
                        resolve(response.status);
                    })
                    .catch(error => {
                        console.log(error);
                        setButtonDisable(true);
                        setFalloReserva(true);
                        reject(error);
                    });
                });
            };
              
            let notificationResolve =  Promise.all([saveData(), sendEmail()]);
            notificationResolve
                .then(response => response.forEach(status => console.log(status)))
                .catch(error => console.error(error));
        };  
          
        
        //Valida el formulario sumamos uno por cada input que se cumple. Almuerzo y cena valen por dos 
        useEffect(()=>{
            let count = 1;
            let disable = true;
            
            if(nombre.length>4) 
                count++;
            
            if(apellido>3) 
                count++;
                        
            if(telefono.length>=9 && Number(telefono))
                count++;
            
            if(Number(telefono))
                count++;
            
            if(mesa && mesa!=="0")
                count++;
            
            if(personas && personas!=="0")
                count++    
            
            if( (almuerzo && almuerzo!=="0") || (cena && cena!=="0"))
                count++;    
            
            if(count===7)
                disable=false;    
            setButtonDisable(disable);

        },[nombre, apellido, telefono, personas, email, mesa, almuerzo, cena])
             
        let apiUser = apiGetUser + username;
        
        
        useEffect(()=>{
          if(authenticate)  
            fetch(apiUser, {
                headers:{
                    Authorization: `Bearer ${token}` 
                }})
            .then(response => response.json())
            .then(body=>{
                setNombre(body['username']);
                setApellido(body['surname'])
                setEmail(body['email'])
                setTelefono(body['telephone'])
            })
               
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[token])
        
        return(
        
        <div className="container">    
            <div className="row justify-content-center">    
                <div className="col-auto">            
                    <form className="g-3 needs-validation"  ref={form} onSubmit={sendEmail}>
                        <div className="row  justify-content-center">
                            <div className="col-12">
                                <h6 className="form-reserva text-center mt-2">Haz ahora</h6>
                            </div>
                            <div className="col-12 text-center mb-4">
                                <h2>tu reserva con nosotros</h2>
                            </div> 
                        
                        {
                            //Renderizamos todos los label con input
                            
                            labelFor.map(element =>(
                                <div className="col-md-4 mx-5 mb-5  justify-content-start" key={element.id}>
                                <LabelInput 
                                    key={element.id} 
                                    value={element.text} 
                                    type={element.type} 
                                    min ={element.min}
                                    max ={element.max} 
                                    isDisable={element.isDisable}
                                    placeholder = {element.placeholder} 
                                    currentValue={element.value}
                                    pattern={element.pattern} 
                                    onHandleChangue={element.setValue}
                                />
                                </div>  
                            ))}
                                                                                                    
                        {/* Renderizamos todos los Select */}

                            <div className="col-md-4 mx-5 mb-5">
                                <SelectForm tittle="Personas" setValueState={setPersonas} name={"personas"}
                                    options={optionPersonas}></SelectForm>
                            </div>
                            <div className="col-md-4 mx-5 mb-5">
                                <SelectForm tittle="Reservar mesa" setValueState={setMesa} name={"mesa"}
                                    options={optionMesa}></SelectForm>
                            </div>
                            <div className="col-md-4 mx-5 mb-5">
                                <SelectForm tittle="Hora almuerzo" setValueState={setAlmuerzo} name={"almuerzo"}
                                    options={horaAlmuerzo}></SelectForm>
                            </div>        
                            <div className="col-md-4 mx-5 mb-1">
                                <SelectForm tittle="Hora Cena" setValueState={setCena} name={"cena"}
                                    options={horaCena}></SelectForm>
                            </div>
                            
                            
                            <div className="col-12  mx-2 mb-5 d-flex justify-content-center align-items-center">
                            <button  type="submit" className="btn btn-warning w-25 my-3 mt-5" disabled={buttonDisable}>Ingresar</button>
                            </div>        
                        
                        {reservaCompleta && <ConfirmSendForm textInfo={"Revise su email"} textConfirm={"Su reserva está confirmada"}/>}
                        {falloReserva && <FailSendForm/>}
                    </div>            
                </form>
            </div>
        </div>
    </div>
            

                          
        
    );
}