import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";


import ClientDashboard from "./pages/ClientDashboard";
import ClientProfile from "./pages/ClientProfile";
import LinkDashboard from "./pages/LinkDashboard";

function App(){
  return(
    <Routes>
        <Route path="/" element={<ClientDashboard />}/>
        <Route path="/profile" element={<ClientProfile />}/>
        <Route path="/linkdashboard" element={<LinkDashboard />}/>
        <Route path="/login" element={<Login />}/>
    </Routes>
  );
}
export default App