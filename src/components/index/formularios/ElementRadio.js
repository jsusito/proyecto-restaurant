export function ElementRadio({text, value, name, checked, onOptionChange}){
    return (
   
        <div className="form-check-inline">
            <input 
                className="form-check-input" 
                type="radio" 
                name={name} 
                id={"gridRadios" + text} 
                value={value}
                checked={checked}
                onChange={onOptionChange}
                />
            <label className="form-check-label" htmlFor={"gridRadios" + text}>
            {text}
            </label>
        </div>
    );
}