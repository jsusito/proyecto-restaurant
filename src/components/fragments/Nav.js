import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CookieMap } from "../index/request/CookieMap";
import { Token } from "../index/request/Token";
import { NavDropDown } from "../nav/NavDropDown";


function Nav(props){
  
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [authenticate, setauthenticate] = useState();
  const [failRequestAuthenticate, setFailRequestAuthenticate] = useState(false);
    
  //Verifica si hay guardado algún token valido en el registro de las cookies.
  useEffect(()=>{
    if(document.cookie.includes("token") && document.cookie.includes("user")){
      
      setauthenticate(true);
      let cookie = new CookieMap(document.cookie);
      let cookieMap = cookie.getObjectCookie()
      setUser(cookieMap.user);
      
    }
  },[])

  //Borra las cookies y desactiva la authenticaficacion 
  const deleteAuthenticate = (()=>{
    setauthenticate(false);
    document.cookie = 'token="";max-age=-1;'
    document.cookie = 'user="";max-age=-1;'
  });



  const handleFormLogin = (e) => {
    e.preventDefault();
    let requestToken = new Token(user, password);
    
    requestToken.requestToken()
      .then((token) => {
        if (requestToken.loggedIn) {
          setauthenticate(true);
          setFailRequestAuthenticate(false)
        } else {
          setFailRequestAuthenticate(true)
          console.log("No se pudo autenticar al usuario." + requestToken.statuscode);
          
          // mostramos el mensaje 5 segundos
          setTimeout(() => {
            setFailRequestAuthenticate(false)
          }, 5000);
        }});
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