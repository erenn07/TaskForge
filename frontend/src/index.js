import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/pages/login.js";
import Dashboard from "./components/pages/Dashboard.js";
import Register from "./components/pages/register.js";
import App from "./App.js";
// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<App />);


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <BrowserRouter>
     
        <App/>
       
      </BrowserRouter>
    </React.StrictMode>
  );
