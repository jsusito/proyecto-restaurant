import './App.css';
import Footer from './components/fragments/Footer';
import Nav from './components/fragments/Nav';
import PagRestaurante from './web/PagRestaurante';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Reserva from './web/Reserva';
import Carta from './web/Carta';
import { Especialidades } from './web/Especialidades';
import { Cookies } from './web/Cookies';
import { Grupo } from './web/Grupo';

function App() {
  
  return (
      
    <BrowserRouter>
        <Nav></Nav>
            <Routes>
              <Route path="/" element={<PagRestaurante></PagRestaurante>}> </Route>
              <Route path="/reserva" element={<Reserva></Reserva>}> </Route>
              <Route path="/carta" element={<Carta></Carta>}> </Route>
              <Route path="/especialidades" element={<Especialidades></Especialidades>}></Route>
              <Route path="/grupo" element={<Grupo></Grupo>}></Route>
            </Routes>
        <Footer></Footer>
        <Cookies ></Cookies>
    </BrowserRouter>
     
  );
}

export default App;
