import axios from "axios";


const instance = axios.create({
  baseURL: "http://localhost:3001/",
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
            const response = await instance.post("http://localhost:3001/auth/login",{email,password},{ withCredentials: true });
            return response.data;
        },
        async register(payload){
            const response = await instance.post("http://localhost:3001/auth/register",payload,{ withCredentials: true });
            return response.data;
        },
        async getUser(token){
          const response = await instance.get("http://localhost:3001/user/getProfile",{ 
            withCredentials: true,
            headers:{
              Authorization:`Bearer ${token}`,
            }
           });
          return response;
        },
 
        async logout(){

          try {
         
         localStorage.removeItem('userToken')
            const response = await axios.get("http://localhost:3001/auth/logout", { withCredentials: true });
            

              return response
          
         
         
            }catch(error){
            alert(error)
          
        }},



// async checkUser(){
  
//     try {
//         const response = await axios.get("http://localhost:3001/auth/checkUser", {withCredentials: true});

//                   return response
              
//               }catch(error){
//                 alert(error)
//               }
//         }


      },
      customer:{
        async getCustomers(userId){
          try {
            const response = await axios.get("http://localhost:3001/customer/getCustomers",{
              params: { userId },  
              withCredentials: true
            });

              return response;
          
          }catch(error){
            alert(error)
          }
        },
        async addCustomer(name,surname,email,phone,projectName,userId){
          try {
            const response = await axios.post("http://localhost:3001/customer/addCustomer",{name,surname,email,phone,projectName,userId} ,{withCredentials: true});

              return response.data;
          
          }catch(error){
            alert(error)
          }
        },
        async deleteCustomer(id){
          try {
            const response = await axios.get("http://localhost:3001/customer/deleteCustomers",{params:{id}} ,{withCredentials: true});

              return response.data;
          
          }catch(error){
            alert(error)
          }
        },
        async updateCustomer (id, field, updatedValue) {
          try {
            const response = await axios.post(
              `http://localhost:3001/customer/updateCustomer/${id}`,
              { [field]: updatedValue },
              { withCredentials: true }
            );
        
            return response.data;
          } catch (error) {
            console.error('Müşteri güncellenirken hata oluştu:', error);
            throw new Error('Müşteri güncellenirken bir hata oluştu.');
          }
        }
        


      },
      project:{
        async addProject(payload){
          try {
            const response = await axios.post("http://localhost:3001/project/addProject",payload ,{withCredentials: true});

              return response.data;
          
          }catch(error){
            alert(error)
          }
        },
        async getProjects(payload){
          try {
            const response = await axios.get("http://localhost:3001/project/getProjects" ,{withCredentials: true});

              return response.data;
          
          }catch(error){
            alert(error)
          }
        },
        async getProjectDetails(payload){
          try {
            const response = await axios.get("http://localhost:3001/project/getProjectDetails" ,{withCredentials: true});

              return response.data;
          
          }catch(error){
            alert(error)
          }
        }
      },
      task:{
        async addTask(payload){
          try {
            const response = await axios.post("http://localhost:3001/task/addTask" ,payload,{withCredentials: true});

              return response.data;
          
          }catch(error){
            alert(error)
          }
        },
        async getTask(){
          try {
            const response = await axios.get("http://localhost:3001/task/getTask" ,{withCredentials: true});

              return response.data;
          
          }catch(error){
            alert(error)
          }
        }
      }
  

  
  }
