import Customer from "../models/Customer.js";
import Project from "../models/Project.js";

const addProject =async(req,res)=>{
     try{  
    console.log("addproject controller")
        const {newRow} = req.body;
        console.log("projectNameeeeeee",newRow.ProjectName)


      const project = await Project.create({
        projectName:newRow.ProjectName,
        projectDescription:newRow.projectDescription,
        customer:newRow.CustomerName,
        hourlyWage:newRow.hourlyWage,
        creatorID:newRow.creatorID
      })
        await project.save();
        res.status(200).json({message:'project added successfully'})
      
    } catch (error) {
      
    }
    }
    const getProjects =async (req,res)=>{
      try {
         const {creatorID}=req.query;
console.log("back back", creatorID)


      const projects = await Project.find({ creatorID: creatorID });


      console.log(projects," pooooo")
      res.status(200).json(projects)
      } catch (error) {
        
      }
     
      
  }

  const getProjects2 = async (req, res) => {
    try {
      const { creatorID, selectedProject } = req.query;
  
      const projects = await Project.find({ creatorID: creatorID, projectName: selectedProject });
  
      if (projects.length > 0) {
        const customerid = projects[0].customer;
        const customer = await Customer.findById(customerid);
  
       // console.log(projects);
        let name=customer.firstName+" "+customer.lastName
        //console.log(name);
  
        res.status(200).json(name);
      } else {
        res.status(404).json({ error: 'Proje bulunamadı' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Sunucu hatası' });
    }
  };
  

  const projectDetails =async (req,res)=>{
      try {
      
          const {id} = req.body;
      console.log("bu gelen id:",id)
          const project = await Project.findById(id);
          res.status(200).json(project);
      
      
        } catch (error) {
          res.status(500).json({message:"server hatası."})
        }
  }
  const deleteProject= async(req,res)=>{
  
    try {
      const {projectId}= req.query;
      
     console.log("deleteProject projectId",projectId)
      const project = await Project.findByIdAndDelete(projectId);
  
      if(!project){
       
        res.status(404).json({succeed:false,message:"Project was not found"})
      }
      res.status(200).json({succeed:true,message:"Project has been deleted succesfully" })
     
    } catch (error) {
      
      
    }
  }
  

export{addProject,getProjects,projectDetails,deleteProject,getProjects2}