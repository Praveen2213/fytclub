// function AuthButton({text}){
//     return(
//         <button className="bg-blue-500 hover:bg-blue-600 p-3 font-semibold w-full">
//             {text}
//         </button>
//     );
// }
// export default AuthButton;
function AuthButton({ text, loading = false, disabled = false }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`
        w-full p-3 rounded-lg font-semibold text-white
        transition-all duration-300 ease-in-out
        flex items-center justify-center gap-2
        ${
          disabled
            ? "bg-blue-500 cursor-not-allowed opacity-80"
            : "bg-blue-500 hover:bg-blue-600 hover:scale-[1.02]"
        }
      `}
    >
      {loading && (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      )}

      {loading ? "Logging in..." : text}
    </button>
  );
}

export default AuthButton;