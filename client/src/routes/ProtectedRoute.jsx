//without this anyone can open dasboard url directly
import { Navigate } from "react-router-dom";
function ProtectedRoute({children}){
    const token=localStorage.getItem("token");
    if(!token){
        return <Navigate to="/" />
    }
    return children;
}
export default ProtectedRoute;