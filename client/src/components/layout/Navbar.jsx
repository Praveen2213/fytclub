import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar(){
    const navigate = useNavigate();
    function handleLogout() {
  localStorage.removeItem("token");
  navigate("/");
}
    return(
        <nav className="bg-slate-800 px-6 py-4 flex justify-between items-center">
             <h1 className="text-2xl font-bold text-white">
             FYTCLUB
             </h1>
             <div className="flex gap-4 text-white">
                <Link to="/dashboard">
                    Dashboard
                </Link>
                <Link to="/profile">
                   Profile
                </Link>
                <Link to="/activities">
                   Activities
                </Link>
             </div>
             <button
               onClick={handleLogout}
               className="bg-red-500 px-4 py-2 rounded-lg"
            >
               Logout
            </button>
        </nav>
    );
}
export default Navbar;