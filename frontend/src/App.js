import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import { Routes, Route, Navigate } from 'react-router-dom';
function App(){
    return(
       
          

     
        <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
  
  
    
    </Routes>
    );
}
export default App;