import { Link } from "react-router-dom";
function Signup(){
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="bg-slate-800 p-8 rounded-2x1 w-[350px] shadow-xl">
                <h1 className="text-3x1 font-bold text-center mb-6">
                    Create Account
                </h1>
                <form className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="p-3 rounded-lg bg-slate-700 outline-none"
                        />
                    <input
                       type="email"
                       placeholder="Email"
                       className="p-3 rounded-lg bg-slate-700 outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="p-3 rounded-lg bg-slate-700 outline-none"
                    />

                <button
                    className="bg-green-500 hover:bg-green-600 p-3 rounded-lg font-semibold"
                >
                 Signup
                </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Already have an account?
                    <Link to="/" className="text-blue-400 ml-1">
                    Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default Signup;