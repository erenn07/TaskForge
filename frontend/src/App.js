
import Customers from "./components/pages/Customers";
import Dashboard from "./components/pages/Dashboard";
import Bills from "./components/pages/bills";
import BusinessRegistration from "./components/pages/businessRegistration.js";

import Login from "./components/pages/login.js";
import ProjectManagement from "./components/pages/projectManagement.js";
import Register from "./components/pages/register.js";
import { Routes, Route, Navigate } from 'react-router-dom';
// import { useState, useEffect } from "react";
// import axios from "axios"
function App(){

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userId, setUserId] = useState(null);
  // useEffect(() => {
  //   const checkSession = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3001/user/check-session', { withCredentials: true });

  //       if (response.data.loggedIn) {
  //         setIsLoggedIn(true);

  //         console.log(response.data.userId)
  //         //setUserId(response.data.userId); // Kullanıcının ID'sini sakla
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //     } catch (error) {
  //       console.error('Oturum kontrolünde hata:', error);
  //       setIsLoggedIn(false);
  //     }
  //   };

  //   checkSession();
  // }, []);

    return(
       
     
        <Routes> 
          <Route path="/" element={<Dashboard />} />
      {/* <Route path="/dashboard" element={isLoggedIn ? <Dashboard />:<Navigate to="/"/>} /> */}
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