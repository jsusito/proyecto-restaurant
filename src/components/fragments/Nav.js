import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Token } from "../index/request/Token";
import { NavDropDown } from "../nav/NavDropDown";
import { NameSesion, TokenSesion, UserSesion } from "../index/authentication/UserSesion";

function Nav(props){
  
  const [password, setPassword] = useState("");
  const [failRequestAuthenticate, setFailRequestAuthenticate] = useState(false);
  const [cursorState, setCursorState] = useState('auto'); //se encarga cambiar el cursor a espera en login
  
  const [user, setUser] = useContext(NameSesion);
  const [authenticate, setauthenticate] = useContext(UserSesion); //variables de contexto
  const [contextToken, setContextToken] = useContext(TokenSesion);
 
 
  //Verifica si hay guardado algún token valido en el registro de las cookies.
  useEffect(()=>{
    if(contextToken && user){
       setauthenticate(true);
    }
  },[])

  //cambiar el puntero del ratón(ocupado) mientras se procesa la solicitud
  useEffect(() => {
    document.body.style.cursor = cursorState; 
  }, [cursorState]);  

  
  
  //Borra las cookies y desactiva la authenticaficacion 
  const deleteAuthenticate = (()=>{
    setauthenticate(false);
    document.cookie = 'token="";max-age=-1;'
    document.cookie = 'user="";max-age=-1;'
  });

  //Se loguea con el servidor, registra las cookies y activa los elementos nuevos
  const handleFormLogin = async(e) => {
    e.preventDefault();
    setCursorState('wait');

    let requestToken = new Token(user, password);
    
    await requestToken.requestToken()
      .then((token) => {
        if (requestToken.loggedIn) {
          setauthenticate(true);
          setFailRequestAuthenticate(false)
          setContextToken(requestToken.token);
        
        } else {
          setFailRequestAuthenticate(true)
          console.log("No se pudo autenticar al usuario." + requestToken.statuscode);
          
          // mostramos el mensaje 5 segundos
          setTimeout(() => {
            setFailRequestAuthenticate(false)
          }, 5000);
        }});

    setCursorState('auto');
  };

  return( 
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light my-2 " aria-label="Barra de menu">
          
          <div className="container-xl">
            
            <div className="navbar-brand col-3">
                <Link className="nav-link active btn-menu" aria-current="page" to="/" style={{fontSize:20}}>Restaurante</Link>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07XL" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
      
            <div className="collapse navbar-collapse" id="navbarsExample07XL">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active btn-menu" to="carta">Carta</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link active btn-menu" to="especialidades">especialidades</Link>
                </li>
                <li className="nav-item ">
                <Link className="nav-link active btn-menu" to="grupo">Menu de grupo</Link>
                </li>
                
                { authenticate &&
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle btn-menu" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Orientales
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li className="nav-item ">
                          <Link className="nav-link active btn-menu" to="cargarRecetas">Cargar</Link>
                          <Link className="nav-link active btn-menu" to="new-receta">Nueva Receta</Link>
                    </li>
                    </ul>
                  </li>

                }
             </ul>
             
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">  
              { !authenticate && 
                  <NavDropDown title="iniciar sesion">
                    
                    <li className="nav-item ">
                      <form className="m-3" onSubmit={handleFormLogin}>
                        <div className="form-floating mb-3">
                          <input type="text" className="form-control" id="floatingInput" placeholder=""
                                value={user} onChange={(e)=>(setUser(e.target.value))} />
                          <label htmlFor="floatingInput">Usuario</label>
                        </div>
                        <div className="form-floating">
                          <input type="password" className="form-control" id="floatingPassword" placeholder=""
                            value={password} onChange={(e)=>(setPassword(e.target.value))} />
                          <label htmlFor="floatingPassword">Contraseña</label>
                        </div>
                        <div className="mt-3 d-flex align-items-center">
                            <button  type="submit" className="btn btn-warning w-10" >Enviar</button>
                        </div>
                        <li><hr className="dropdown-divider"/></li>

                      </form>
                    </li>
                  
                  </NavDropDown>
                }
                
                { authenticate &&
                  <>
                      <NavDropDown title={user}>
                      
                        <a className="nav-link active btn-logger" href="#">Mis reservas</a>
                      
                        <a className="nav-link active btn-logger" href="#" onClick={deleteAuthenticate}>Logout</a>
                      
                      </NavDropDown>  
                  </>
              }
              </ul>
              
              <Link className="nav-link btn-reserva" to={"reserva"}>reserva</Link>
               
               {/* En caso de error en la autentificacion mostramos el mensaje*/}
               {failRequestAuthenticate &&
                <div className="position-absolute top-1 end-0 mt-2 me-2">
                  <div className="alert alert-danger error-autentificacion" role="alert">
                    Credenciales no válidos
                  </div>
                </div>
              }

            </div>
          </div>
        </nav>  
      </div>  
    
  )
}
export default Nav;