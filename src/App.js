import './App.css';
import Footer from './components/fragments/Footer';
import Nav from './components/fragments/Nav';
import PagRestaurante from './web/PagRestaurante';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Reserva from './web/Reserva';
import Carta from './web/Carta';
import { Especialidades } from './web/Especialidades';
import { Cookies } from './web/Cookies';
import { Grupo } from './web/Grupo';
import { CargarRecetas } from './web/CargarRecetas';
import { NewReceta } from './components/index/formularios/NewReceta';

function App() {
  
  return (
      
    <HashRouter>
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
    </HashRouter>
     
  );
}

export default App;
