import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
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
      {/* <Route path="/dashboard" element={isLoggedIn ? <Dashboard />:<Navigate to="/"/>} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
  
  
    
    </Routes>
    );
}
export default App;