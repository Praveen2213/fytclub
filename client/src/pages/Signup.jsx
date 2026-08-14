import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput";
import {signupUser} from "../services/authService";
import AuthButton from "../components/auth/AuthButton";
function Signup(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const navigate = useNavigate();
    async function handleSignup(e){
        e.preventDefault();
        setError("");
        if(!name || !email || !password){
            setError("Please fill all fields");
            return;
        }
        if(password.length<6){
            setError("Password must be at least 6 characters");
            return;
        }
        try{  // Send signup request to backend
            setLoading(true);
          const data = await signupUser({
    username: name,
    email,
    password,
});

localStorage.setItem("token", data.token);
localStorage.setItem("userId", data.userId);
localStorage.setItem("username", data.username);

navigate("/dashboard");
        }catch(error){
            console.log(
      error.response?.data
   );

            setError( //optional chaining prevents if something is undefined
                error.response?.data?.message || "Something went wrong" //fallback error
            );
        }finally{ //always runs either succes or fail
            setLoading(false);
        }
    }
    return(
 <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-2xl w-[350px] shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-4"
        >
          <AuthInput
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <AuthInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

        <AuthButton
    text="Signup"
    loading={loading}
    disabled={loading}
/>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?
          <Link
            to="/"
            className="text-blue-400 ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
    );
}
export default Signup;
