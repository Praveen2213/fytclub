import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import {Routes, Route} from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App(){
  return(
    <Routes>
    <Route
     path="/dashboard"
     element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
    <Route path="/" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    </Routes>
  );
}
export default App;