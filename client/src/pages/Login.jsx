import { Link } from "react-router-dom";
function Login(){
    return(
        <div className="min-h-screen flex items-center justify-center bg-slate-900 ">
        <div className="bg-slate-800 p-8 rounded-2x1 w-[350px] shadow-xl">
        <h1 className="text-3x1 font-bold text-center mb-6">
            FYTCLUB
        </h1>
        <form className="flex flex-col gap-4">
            <input
               type="email"
               placeholder="Email"
               className="p-3 ropunded-lg bg-slate-700 outline-none"
               />
            <input
               type="password"
               placeholder="Password"
               className="p-3 rounded-lg bg-slate-700 outline-none"
               />
               <button 
                  className="bg-blue-500 hover:bg-blue-600 p-3 rounded-lg font-semibold">
                    Login
                </button>   
        </form>
        <p className="mt-4 text-center text-sm">
            Don't have an account ?
            <Link to="/signup" className="text-blue-400 ml-1">
              Signup
            </Link>
        </p>
        </div>
        </div>
    );
}
export default Login;