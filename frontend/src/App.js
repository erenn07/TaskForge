import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/login";
import Register from "./components/pages/register";

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