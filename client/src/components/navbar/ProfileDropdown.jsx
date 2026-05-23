import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function ProfileDropdown(){
    const[open,setOpen]=useState(false);
    const navigate = useNavigate();
     function handleLogout() {
  localStorage.removeItem("token");
  navigate("/");
}
return(
    <div className="relative">
        {/* PROFILE CIRCLE*/}
        <button onClick={()=>setOpen(!open)}
        className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg border-2 border-slate-700 hover:scale-105 transition-all duration-300 overflow-hidden"
      >
        {/* TEMP LETTER */}
        R
      </button>

      {/* DROPDOWN */}

      {
        open && (

          <div className="absolute right-0 mt-3 w-56 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50">
            <Link
              to="/profile"

              className="block px-5 py-4 hover:bg-slate-700 transition-all duration-300"
            >
              👤 My Profile
            </Link>
            <Link
              to="/history"
              className="block px-5 py-4 hover:bg-slate-700 transition-all duration-300"
            >
              📜 History
            </Link>
            <button
              className="w-full text-left px-5 py-4 hover:bg-slate-700 transition-all duration-300"
            >
              ✏️ Edit Profile
            </button>
            <button
              className="w-full text-left px-5 py-4 hover:bg-red-500/20 text-red-400 transition-all duration-300"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>
        )
      }
    </div>
);
}
export default ProfileDropdown;