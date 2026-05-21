import { useState } from "react";
import { Link } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import {loginUser} from "../services/authService"
import { useNavigate } from "react-router-dom";
function Login(){
    const[email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    async function handleLogin(e){
        e.preventDefault();
        setError("");
        if (!email || !password) {
         setError("Please fill all fields");
        return;
        }
        try{
            setLoading(true);
            const data=await loginUser({
                email,
                password,
            });
            console.log(data);
           navigate("/dashboard");
        }catch(error){
            setError(
         error.response?.data?.message ||
        "Login failed"
        );
        }finally {
           setLoading(false);
        }
    }
    return(
         <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-slate-800 p-8 rounded-2xl w-[350px] shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          FYTCLUB
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >

          <AuthInput
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthInput
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        {error && (
  <       p className="text-red-400 text-sm">
         {error}
        </p>
        )}
          <AuthButton text="Login" />
          {/* <button disabled={loading}>
           {loading ? "Logging in..." : "Login"}
           </button> */}

        </form>

        <p className="mt-4 text-center text-sm">

          Don't have an account?

          <Link
            to="/signup"
            className="text-blue-400 ml-1"
          >
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
}
export default Login;