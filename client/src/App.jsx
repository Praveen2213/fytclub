import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import {Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LogActivity from "./pages/LogActivity";
import Leaderboard from "./pages/Leaderboard";
import History from "./pages/History";
import Profile from "./pages/Profile";
import CreateBattle from "./pages/CreateBattle";
import Battles from "./pages/Battles";
import BattleDetails
from "./pages/BattleDetails";
import BattleRequest from "./pages/BattleRequest";
function App(){
  return(
    <Routes>
      <Route
  path="/create-battle"
  element={<CreateBattle />}
/>
<Route
  path="/battles"
  element={<Battles />}
/>
<Route
  path="/battles/:id"
  element={<BattleDetails />}
/>
<Route path="/battle-request/id/:id" element={<BattleRequest />} />
<Route path="/battle-request/:token" element={<BattleRequest />} />
    <Route
     path="/dashboard"
     element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/history"
  element={<History />}
/>
<Route
  path="/leaderboard"
  element={<Leaderboard />}
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route
  path="/log-activity"
  element={<LogActivity />}
/>
    <Route path="/" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    </Routes>
  );
}
export default App;