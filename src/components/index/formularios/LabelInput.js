export function LabelInput(props,{labelSize = 3, sizeInput = 8}){
    return(
       <>
            <label htmlFor={props.value}  className="form-label">{props.value}</label>
            <input  className="form-control" 
                name={props.value}
                id={props.value}
                type={props.type}
                value={props.currentValue}
                disabled={props.isDisable}
                placeholder={props.placeholder}
                onChange={(event)=>(props.onHandleChangue(event.target.value))}
                min={props.min}
                max={props.max}
                required
                />
        </>
    );
}