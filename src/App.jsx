import { Routes, Route } from "react-router-dom";

import ClientDashboard from "./pages/ClientDashboard";
import ClientProfile from "./pages/ClientProfile";
import LinkDashboard from "./pages/LinkDashboard";

function App(){
  return(
    <Routes>
        <Route path="/" element={<ClientDashboard />}/>
        <Route path="/profile" element={<ClientProfile />}/>
        <Route path="/linkdashboard" element={<LinkDashboard />}/>
    </Routes>
  );
}
export default App