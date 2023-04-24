export function ModalInfo(props){

    return(
     <>
      <button type="button" className="text-danger btn btn-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
         X
      </button>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">{props.title}</h5>
             
            </div>
            <div className="modal-body">
              {props.bodyMsg}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={props.handleOnClick}>Confirmar</button>
            </div>
          </div>
        </div>
      </div>
     </>
    );
}