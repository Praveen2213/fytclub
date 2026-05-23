import { Link } from "react-router-dom";
import ProfileDropdown from "../navbar/ProfileDropdown";
//import { useNavigate } from "react-router-dom";
function Navbar(){
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
           <ProfileDropdown />
        </nav>
    );
}
export default Navbar;