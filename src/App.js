import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/fragments/Footer';
import Nav from './components/fragments/Nav';
import { NameSesion, TokenSesion, UserSesion } from './components/index/authentication/UserSesion';
import { NewReceta } from './components/index/formularios/NewReceta';
import { CookieMap } from './components/index/request/CookieMap';
import { CargarRecetas } from './web/CargarRecetas';
import Carta from './web/Carta';
import { Cookies } from './web/Cookies';
import { Especialidades } from './web/Especialidades';
import { Grupo } from './web/Grupo';
import PagRestaurante from './web/PagRestaurante';
import Reserva from './web/Reserva';

function App() {
    
const [token, setToken] = useState();
const [authenticate,setAuthenticate] = useState();
const [nameSesion, setNameSesion] = useState();

  //Verifica si hay guardado algún token valido en el registro de las cookies.
  useEffect(()=>{
    if(document.cookie.includes("token") && document.cookie.includes("user")){
      
      let cookie = new CookieMap(document.cookie);
      let cookieMap = cookie.getObjectCookie()
      
      setToken(cookieMap.token);
      setNameSesion(cookieMap.user);
      setAuthenticate(true);
            
    }
  },[token])
  console.log(token)
  return (
      
    <HashRouter>
      
      
      <UserSesion.Provider value={[authenticate, setAuthenticate]}>
        <TokenSesion.Provider value={[token, setToken]}>
         <NameSesion.Provider value={[nameSesion, setNameSesion]}>
          
          <Nav></Nav>
              <Routes>
                <Route path="/" element={<PagRestaurante></PagRestaurante>}> </Route>
                <Route path="/reserva" element={<Reserva></Reserva>}> </Route>
                <Route path="/carta" element={<Carta></Carta>}> </Route>
                <Route path="/especialidades" element={<Especialidades></Especialidades>}></Route>
                <Route path="/grupo" element={<Grupo></Grupo>}></Route>
                <Route path="/cargarRecetas" element={<CargarRecetas/>}></Route>
                <Route path="/new-receta" element={<NewReceta/>}></Route>
              </Routes>
          <Footer></Footer>
          <Cookies ></Cookies>
         
         </NameSesion.Provider> 
        </TokenSesion.Provider>
      </UserSesion.Provider>

    </HashRouter>
     
  );
}

export default App;
