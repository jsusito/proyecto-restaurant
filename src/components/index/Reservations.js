import { useContext, useEffect, useState } from "react";
import { UserContext } from "./authentication/UserSesion";
import { Constants } from "../../utils/Constants";
import { Alert } from "./mesages/Alert";
import { ModalInfo } from "./mesages/ModalInfo";

export function Reservations() {
  const context = useContext(UserContext);
  const [dataTable, setDataTable] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [cursorState, setCursorState] = useState('auto');
 
  const APIS = new Constants();
  const API_RESERVATION = APIS.API_RESERVATION + context.nameSesion;

  //Borra la fila de la tabla y de la base de datos
  const cancelReservation = async (index, idReservation) =>{
    
    setCursorState('wait'); 
    await fetch(APIS.API_RESERVATION + idReservation, {
      method:"DELETE",
      headers: {
        authorization: `Bearer ${context.token}`,
      },
    })
    .then(()=>
      setDataTable(prevState => {
        let aux = [...prevState]; //creamos una copia del estado anterior
        aux.splice(index, 1);
        return aux; //devolvemos el estado modificado
    }))
    .catch(error => console.log(error));

    setCursorState('auto');
     
  }
  
  //Carga inicial de las reservas
  useEffect(() => {
    fetch(API_RESERVATION, {
      headers: {
        authorization: `Bearer ${context.token}`,
      },
    })
      .then((response) => response.json())
      .then((registers) => {
        const reservations = registers.map((reserva) => ({
          id: reserva.id,
          user: reserva.userUsername,
          tel: reserva.userTelephone,
          dateReservations: reserva.dateReservations,
          dinnerTable: reserva.dinnerTable,
          lunchHour: reserva.lunchHour,
          numberPeople: reserva.numberPeople,
        }));
        setDataTable(reservations);
      })
      .catch((error) => {
        console.error(error)
        setShowAlert(true);
        
      });
  }, []);

  useEffect(() => {
    document.body.style.cursor = cursorState; 
  }, [cursorState]); 

  return (
    <div className="container">
      <div className="row justify-content-center mb-4" >
                            
      <div className="col-12 d-flex justify-content-center">
          <h3 className="display-6 pt-3 "> tus reservas </h3>
      </div>
      
      </div>
      <div className="row">
        <div className="col">
          <table className="tabla-reservas table table-hover mb-5">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th scope="col">nombre</th>
                <th scope="col">telefono</th>
                <th scope="col">fecha</th>
                <th scope="col">mesa</th>
                <th scope="col">hora</th>
                <th scope="col">personas</th>
              </tr>
            </thead>
            <tbody>
              {dataTable &&
                dataTable.map((reservation, index) => (
                  <tr key={reservation.id} >
                    <th scope="row">{<ModalInfo 
                      title="Cancelación de reserva"
                      bodyMsg="¿Estás seguro que quieres cancelar la reserva?"
                      handleOnClick={() => cancelReservation(index, reservation.id)}/>}</th>
                    <td>{reservation.user}</td>
                    <td>{reservation.tel}</td>
                    <td>{reservation.dateReservations}</td>
                    <td>{reservation.dinnerTable}</td>
                    <td>{reservation.lunchHour}</td>
                    <td>{reservation.numberPeople}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {showAlert && <Alert msg="No se puedo cancelar la reserva" handleClick ={()=>setShowAlert(false)} />}
      
    </div>
  );
}
