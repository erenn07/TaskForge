
import Customers from "./components/pages/Customers";
import Dashboard from "./components/pages/Dashboard";
import Bills from "./components/pages/bills";
import BusinessRegistration from "./components/pages/businessRegistration.js";

import Login from "./components/pages/login.js";
import ProjectManagement from "./components/pages/projectManagement.js";
import Register from "./components/pages/register.js";
import { Routes, Route, Navigate } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import api from "./services/api.js";

// import { useState, useEffect } from "react";
// import axios from "axios"
function App(){
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const storedUserToken = localStorage.getItem('userToken');
        const expirationTime = localStorage.getItem('tokenExpiration');
  
        const currentTime = new Date().getTime();
  
        if (storedUserToken && expirationTime && currentTime < expirationTime) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem('userToken');
          localStorage.removeItem('tokenExpiration');
        }
      } catch (error) {
        console.error('Oturum kontrol hatası:', error);
        setIsLoggedIn(false);
      }
    };
  
    checkUserToken();
  }, [navigate]);

  if (isLoggedIn === null) {
    return <div>Yükleniyor...</div>;
  }

 
   return(
       
        <Routes>
  <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
  <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
  <Route path="/register" element={isLoggedIn ? <Dashboard /> : <Register/>} />
  <Route path="/bills" element={isLoggedIn ? <Bills /> : <Navigate to="/" />} />
  <Route path="/businessRegistration" element={isLoggedIn ? <BusinessRegistration /> : <Navigate to="/" />} />
  <Route path="/projectManagement" element={isLoggedIn ? <ProjectManagement /> : <Navigate to="/" />} />
  
  <Route
  path="/customers"
  element={isLoggedIn ? <Customers /> : <Navigate to="/" />}
/>
  </Routes>

    );
}
export default App;