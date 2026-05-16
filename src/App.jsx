import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";


import ClientDashboard from "./pages/ClientDashboard";
import ClientProfile from "./pages/ClientProfile";
import LinkDashboard from "./pages/LinkDashboard";

function App(){
  return(
    <Routes>
        <Route path="/dashboard" element={<ClientDashboard />}/>
        <Route path="/profile" element={<ClientProfile />}/>
        <Route path="/linkdashboard" element={<LinkDashboard />}/>
        <Route path="/" element={<Login />}/>
    </Routes>
  );
}
export default App