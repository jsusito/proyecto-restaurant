import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../index/CountDown";
import { UserContext } from "../index/authentication/UserSesion";
import { Token } from "../index/request/Token";
import { NavDropDown } from "../nav/NavDropDown";

function Nav(props){
  
  const linkNavRef = useRef();
  const [password, setPassword] = useState("");
  const [failRequestAuthenticate, setFailRequestAuthenticate] = useState(false);
  const [cursorState, setCursorState] = useState('auto'); //se encarga cambiar el cursor a espera en login
  
  const  context = useContext(UserContext);
  
  const [user, setUser] = [context.nameSesion, context.setNameSesion];
  const [authenticate, setAuthenticate] = [context.authenticate, context.setAuthenticate]
  const [contextToken, setContextToken] = [context.token, context.setToken];
 
  const [startCountDown, setStartCountDown] = useState(context.timeSecurityExit);

  const [hideNav, setHideNav] = useState(false);

  useEffect(()=>{
    if(hideNav){
      linkNavRef.current.style.display = "none";
    }
    else
     linkNavRef.current.style.display = "";
  },[hideNav])
  
  
  
  //Verifica si hay guardado algún token valido en el registro de las cookies
  useEffect(()=>{
    if(contextToken && user){
       setAuthenticate(true);
    }
  },[])


  useEffect(()=>{
    
    if(context.timeSecurityExit){
      setStartCountDown(true);
    }
    else
    setStartCountDown(false);
    
  },[context.timeSecurityExit])

  
  
  //cambiar el puntero del ratón(ocupado) mientras se procesa la solicitud
  useEffect(() => {
    document.body.style.cursor = cursorState; 
  }, [cursorState]);  

  
  
  //Borra y desactiva la authenticaficacion 
  const deleteAuthenticate = (()=>{
    setAuthenticate(false);
    document.cookie = 'token="";max-age=-1;'
    document.cookie = 'user="";max-age=-1;'
    document.cookie = 'authorities="";max-age=-1;'
  });



  //Se loguea con el servidor, registra las cookies y activa los elementos nuevos
  const handleFormLogin = async(e) => {
    e.preventDefault();
    setCursorState('wait');

    let requestToken = new Token(user, password);
    
    await requestToken.requestToken()
      .then((token) => {
        if (requestToken.loggedIn) {
          setAuthenticate(true);
          setFailRequestAuthenticate(false);
          setContextToken(requestToken.token);
          
        
        } else {
          setFailRequestAuthenticate(true)
          console.log("No se pudo autenticar al usuario." + requestToken.statuscode);
          
          // mostramos el mensaje 5 segundos
          setTimeout(() => {
            setFailRequestAuthenticate(false)
          }, 5000);
        }});
    
    context.authorities.current = requestToken.authorities;
    setCursorState('auto');
  };

  return( 
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light my-2 " aria-label="Barra de menu">
          
          <div className="container-xl">
            
            <div className="navbar-brand col-3">
                <Link className="nav-link active btn-menu" aria-current="page" to="/" style={{fontSize:20}}>Restaurante</Link>
            </div>
            <button className="navbar-toggler" 
              onClick ={()=>{
                if(hideNav) setHideNav(false);
                }}
              type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarsExample07XL" 
              aria-controls="navbarsExample07XL" 
              aria-expanded="false" 
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
      
            <div className="collapse navbar-collapse" id="navbarsExample07XL" ref={linkNavRef}>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active btn-menu" to="carta" onClick={()=>setHideNav(true)}>Carta</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link active btn-menu" to="especialidades" onClick={()=>setHideNav(true)}>especialidades</Link>
                </li>
                <li className="nav-item ">
                <Link className="nav-link active btn-menu" to="grupo" onClick={()=>setHideNav(true)}>Menu de grupo</Link>
                </li>
                
                { authenticate &&
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle btn-menu" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Orientales
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li className="nav-item ">
                          <Link className="nav-link active btn-menu" to="cargarRecetas" onClick={()=>setHideNav(true)}>Cargar</Link>
                          <Link className="nav-link active btn-menu" to="new-receta" onClick={()=>setHideNav(true)}>Nueva Receta</Link>
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
                      
                        <Link className="nav-link active btn-logger" to="/reservas" onClick={()=>setHideNav(true)}>Mis reservas</Link>
                        {
                          context.authorities.current.includes("ADMIN") &&  
                          <Link className="nav-link btn-logger" to={"new-user"} onClick={()=>setHideNav(true)}>Nuevo usuario</Link>
                        }
                        <a className="nav-link active btn-logger" href="#" onClick={deleteAuthenticate}>cerrar sesión</a>
                      
                      </NavDropDown>
                      <li className="nav-link">
                        
                        <small className="text-danger">
                          {startCountDown && <Countdown logout={setAuthenticate}/>}
                        </small>
                      </li>   
                  </>
              }
              </ul>
              
              <Link className="nav-link btn-reserva" to={"reserva"} onClick={()=>setHideNav(true)}>reserva</Link>
               
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
