import { Link } from "react-router-dom";


function Nav(){
   
  return( 
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light my-2 d-flex" aria-label="Barra de menu">
          
          <div className="container-xl">
            
            <div className="navbar-brand">
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
                
              </ul>
              <Link className="nav-link btn-reserva" to={"reserva"}>reserva</Link>
            </div>
          </div>
        </nav>  
           
    </div>  
    )
}

export default Nav;