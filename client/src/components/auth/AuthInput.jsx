function AuthInput({
    type,
    placeholder,
    value,
    onChange,
}){
    return(
        <input 
         type={type}
         placeholder={placeholder}
         value={value}
         onChange={onChange}
         className="p-3 rounded-lg bg-slate-700 outline-none w-full"
         />
    );
}
export default AuthInput;
