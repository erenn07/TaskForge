import Project from "../models/Project.js";

const addProject =async(req,res)=>{
   /*  try{  
    console.log("addproject controller")
        const {customerId,customerProjectName,customerEmail} = req.body;
        console.log("addproject 2",customerProjectName)
        console.log("addproject 3",customerEmail)
        console.log("addproject 3",customerId)


        const isEmailValid = validateEmail(customerEmail);
        if (!isEmailValid) {
        return res.status(400).json({ success: false, message: 'Geçerli bir email adresi giriniz.' });
      }

      const project = await Project.create({
        projectName:customerProjectName,
        customer:customerId,
        // tasks:[], 
      })
        await project.save();
        res.status(200).json({message:'project added successfully'})
      
    } catch (error) {
      
    }*/
    }
const getProject =async ()=>{

}

const getProjectDetails =async ()=>{

}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export{addProject,getProject,getProjectDetails}