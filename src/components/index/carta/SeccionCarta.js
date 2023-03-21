function SeccionCarta(props){
        
    return (
            <div className="container ">
                
                <div className="row align-items-center justify-content-between"> 
                    <div className="col-12 my-4">
                        <p className="header-carta">{props.header}</p>
                    </div>
                
                
                <div className="col-md-6 justify-content-center align-items-start  py-1 my-3">
                    <p className="parraf-tittle ">{props.tittle}</p>
                    {
                        props.recetas.map(receta => {
                            return (
                                <p  
                                    className="parraf-carta mb-4" 
                                    onClick={()=>props.setValueState(receta.imagen)}
                                    key={receta.id}
                                >
                                    {receta.description}
                                </p>
                            )
                        })
                    }    
                </div>
                
                <div className="col-md-6 mb-3 justify-content-center">
                    {
                        // eslint-disable-next-line jsx-a11y/alt-text
                        <a href={props.valueState}><img  src={props.valueState} className="img-carta"></img></a>
                    }
                </div>
                </div>
               
            </div>    
     
    );
}

export default SeccionCarta