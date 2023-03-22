import { useEffect, useState } from "react";
import { LabelInput } from "./LabelInput";
import React, { useRef } from 'react';
import emailJS from "@emailjs/browser";
import { SelectForm } from "./SelectForm";
import { GetTomorrowDate } from "../GetTomorrowDate";
import { ConfirmSendForm } from "./ConfirmSendForm";
import { FailSendForm } from "./FailSendForm";


const optionMesa=["1","2","3","4","5","6","7","8"];
const horaAlmuerzo=["12:00","12:30","13:00","13:30","14:00"]
const horaCena=["19:00","20:00","21:00","22:00"]
const optionPersonas=[1,2,3,4,5,6]

const labelFor =[
        {
           id:0,
           text: "nombre",
           type: "text",
           placeholder:"Mayor de cuatro letras",
           
               
        },
        {
            id:1,
            text: "apellido",
            type: "text",
            placeholder:"Mayor de cuatro letras",     
            
        },
        {
            id:2,
            text: "telefono",
            type: "text",
            placeholder:"numero de 9 cifras o mayor",
               
         },
         {
            id:3,
            text:"fecha",
            type:"date",
            
        },
        {
            id:4,
            text:"email",
            type:"email",
            placeholder:"Introduzca el email"
        },
        
        
];

export function FormReservas(){
        const [buttonDisable, setButtonDisable] = useState(true);
        
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
              
        //Manda el email
        const form = useRef();
        const sendEmail = (e) => {
            e.preventDefault();
            emailJS.sendForm('service_your_number', 'template_your_number', form.current, 'your number')
            
            .then(()=>{
                setReservaCompleta(true);
                setButtonDisable(true);    
            })
            .catch(error =>{
                console.log(error)
                setButtonDisable(true);
                setFalloReserva(true);
            });
          };
        
        
        //Valida el formulario sumamos uno por cada input que se cumple. Almuerzo y cena valen por dos 
        useEffect(()=>{
            let count = 1;
            let disable = true;
            
            if(nombre.length>3) 
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
             

        return(
        
        <div className="container">    
            <div className="row justify-content-center">    
                <div className="col-auto">            
                    <form className="g-3" ref={form} onSubmit={sendEmail}>
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