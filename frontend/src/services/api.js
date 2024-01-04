import axios from "axios";


const instance = axios.create({
  baseURL: "http://161.35.30.110/",
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
            const response = await instance.post("http://161.35.30.110/auth/login",{email,password},{ withCredentials: true });
            return response.data;
        },
        async register(payload){
            const response = await instance.post("http://161.35.30.110/auth/register",payload,{ withCredentials: true });
            return response.data;
        },
        async getUser(token){
          const response = await instance.get("http://161.35.30.110/user/getProfile",{ 
            withCredentials: true,
            headers:{
              Authorization:`Bearer ${token}`,
            }
           });
          return response;
        },
        async getInfo(payload){
          const response = await instance.post("http://161.35.30.110/user/getInfo",payload,{withCredentials: true});
          return response.data;
        },
        
 
        async logout(){

      try {

        localStorage.removeItem('userToken')
        const response = await axios.get("http://161.35.30.110/auth/logout", { withCredentials: true });


        return response



      } catch (error) {
        alert(error)

      }
    },


      },
      customer:{
        async getCustomers(userId){
          try{
            const response = await axios.get("http://161.35.30.110/customer/getCustomers",{
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
            const response = await axios.post("http://161.35.30.110/customer/addCustomer",{name,surname,email,phone,projectName,userId} ,{withCredentials: true});

              return response.data;
          
          }catch(error){
            alert(error)
          }
        },
        async deleteCustomer(id){
          try {
            const response = await axios.get("http://161.35.30.110/customer/deleteCustomers",{params:{id}} ,{withCredentials: true});

        return response.data;

      } catch (error) {
        alert(error)
      }
    },
    async updateCustomer(updatedData) {
      try {
        const response = await axios.post(
          `http://161.35.30.110/customer/updateCustomer/${updatedData.id}`,
          updatedData,
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        throw new Error('Müşteri güncellenirken hata oluştu: ' + error);
      }
    }



      },
      project:{
        async addProject(payload){
          try {
            const response = await axios.post("http://161.35.30.110/project/addProject",payload ,{withCredentials: true});

              return response.data;
          
          }catch(error){
            alert(error)
          }
        },
        async getProjects(creatorID){
          try {
            const response = await axios.post("http://161.35.30.110/project/getProjects" ,{creatorID},{withCredentials: true});

        return response.data;

      } catch (error) {
        alert(error)
      }
    },
    async getProjectDetails(payload) {
      try {
        const response = await axios.get("http://161.35.30.110/project/getProjectDetails", { withCredentials: true });

              return response.data;
          
          }catch(error){
            alert(error)
          }
        }, 
        async deleteProject(projectId){
          const response = await axios.post("http://161.35.30.110/project/deleteProject",{projectId},{withCredentials: true});
          return response.data;
        }
      },
     
      task:{
        async addTask(newTask){
          try {
            const response = await axios.post("http://161.35.30.110/task/addTask" ,{newTask},{withCredentials: true});

        return response.data;

      } catch (error) {
        alert(error)
      }
    },
    async getTask(projectId) {
      try {
        const response = await axios.post("http://161.35.30.110/task/getTask",{projectId}, { withCredentials: true });

        return response.data;

      } catch (error) {
        alert(error)
      }
    },
    async updateTask(newTasks){
      try {
        const response = await axios.post("http://161.35.30.110/task/updateTask",{newTasks}, { withCredentials: true });

        return response.data;

      } catch (error) {
        alert(error)
      }
    },
    async deleteTask(id){
      try {
        const response = await axios.post("http://161.35.30.110/task/deleteTask",{id}, { withCredentials: true });

        return response.data;

      } catch (error) {
        alert(error)
      }
    }
  }



}
