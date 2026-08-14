// function AuthInput({
//     type,
//     placeholder,
//     value,
//     onChange,
// }){
//     return(
//         <input 
//          type={type}
//          placeholder={placeholder}
//          value={value}
//          onChange={onChange}
//          className="p-3 rounded-lg bg-slate-700 outline-none w-full"
//          />
//     );
// }
// export default AuthInput;
function AuthInput({
  type,
  placeholder,
  value,
  onChange,
  disabled = false,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={onChange}
      className="
        p-3 rounded-lg
        bg-slate-700
        outline-none
        w-full
        transition-all
        duration-300
        disabled:opacity-60
        disabled:cursor-not-allowed
      "
    />
  );
}

export default AuthInput;