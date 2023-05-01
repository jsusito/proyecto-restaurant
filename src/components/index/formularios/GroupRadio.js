import { ElementRadio } from "./ElementRadio";

export function GroupRadio({tittle, radios,valueState, setValueState, name}){
   
    const onOptionChange = (event) => {
        setValueState( event.target.value );
        console.log(event.target.value)
    }
    return (
        <fieldset className="row mb-3">
            <legend className="col-form-label col-sm-12 pt-0">{tittle}</legend>
            <div className="col-sm-12">
                {
                    
                    radios.map(element => <ElementRadio 
                        className="btn-radio"
                        key={element}
                        value={element} 
                        text={element}
                        name={name}
                        checked={valueState === element}
                        onOptionChange={onOptionChange}/> 
                        
                        )
                    }
                <button type="button" className="btn-form " onClick={()=>(setValueState(false))} >borrar</button>
            </div>
        </fieldset>

    );
}

