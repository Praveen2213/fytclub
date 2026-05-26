import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import {Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LogActivity from "./pages/LogActivity";
import Leaderboard from "./pages/Leaderboard";
import ActivityHistory from "./pages/ActivityHistory";
import BattleHistory from "./pages/BattleHistory";
import Profile from "./pages/Profile";
import CreateBattle from "./pages/CreateBattle";
import Battles from "./pages/Battles";
import BattleDetails
from "./pages/BattleDetails";
import BattleReport
from "./pages/BattleReport";
import BattleRequest from "./pages/BattleRequest";
import EditProfile from "./pages/EditProfile";
import ChangePassword
from "./pages/ChangePassword";
function App(){
  return(
    <Routes>
      <Route
  path="/create-battle"
  element={<CreateBattle />}
/>
<Route
  path="/battle-report/:id"
  element={<BattleReport />}
/>
<Route
  path="/change-password"
  element={<ChangePassword />}
/>
<Route
  path="/edit-profile"
  element={<EditProfile />}
/>
<Route
  path="/battles"
  element={<Battles />}
/>
<Route
  path="/battle/:id"
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
  path="/activity-history"
  element={<ActivityHistory />}
/>

<Route
  path="/battle-history"
  element={<BattleHistory />}
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