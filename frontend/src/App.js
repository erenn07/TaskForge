
import Customers from "./components/pages/Customers";
import Dashboard from "./components/pages/Dashboard";
import Bills from "./components/pages/bills";
import BusinessRegistration from "./components/pages/businessRegistration";
import Login from "./components/pages/login";
import ProjectManagement from "./components/pages/projectManagement";
import Register from "./components/pages/register";
import { Routes, Route, Navigate } from 'react-router-dom';
function App(){
    return(
       
          

     
        <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/bills" element={<Bills />} />
      <Route path="/businessRegistraion" element={<BusinessRegistration />} />
     <Route path="/projectManagement" element={<ProjectManagement />} />
     <Route path="/customers" element={<Customers />} />
  
  
    
    </Routes>
    );
}
export default App;