import axios from "axios";


const instance = axios.create({
  baseURL: "http://localhost:3001/",
});

instance.interceptors.request.use((config) => {
  const auth = localStorage.getItem("auth");
  if (!auth) return config;
  const parsed = JSON.parse(auth);
  config.headers["x-access-token"] = parsed?.token;
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error.response.status && error.response) {
      
      localStorage.clear();
      //window.location.href = "/login";
    } else {
      return Promise.reject(error);
    }
  }
);

export default{
    user:{
        async login(email,password){
            const response = await instance.post("/auth/login",{email,password},{ withCredentials: true });
            return response.data;
        },
        async register(payload){
            const response = await instance.post("/auth/register",payload,{ withCredentials: true });
            return response;
        },
        async getUser(token){
          const response = await instance.get("/user/getProfile",{ 
            withCredentials: true,
            headers:{
              Authorization:`Bearer ${token}`,
            }
           });
          return response;
        },
 
        async logout(){

          try {
            const response = await axios.get("http://localhost:3001/auth/logout", { withCredentials: true });

              return response
          
          }catch(error){
            alert(error)
          
        }},



async checkUser(){
  
    try {
        const response = await axios.get("http://localhost:3001/auth/checkUser", {withCredentials: true});

          return response
      
      }catch(error){
        alert(error)
      

    }
}


      }
  

  
  }
