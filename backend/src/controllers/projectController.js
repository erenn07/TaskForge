import Customer from "../models/Customer.js";
import Project from "../models/Project.js";
import mongoose from "mongoose"
const addProject = async (req, res) => {
  try {

      const { newRow } = req.body;
      
      const name=newRow.CustomerName.split(" ")[0]
      
const customer=await Customer.find({firstName:name})
const customerId=customer[0]._id
      const project=await Project.create({
          projectName: newRow.ProjectName,
          projectDescription: newRow.projectDescription,
          customer: customerId,
          hourlyWage: newRow.hourlyWage,
          creatorID: newRow.creatorID
      });

      if (project) {
          res.status(200).json({ message: 'project added successfully' });
      } else {
          // Proje oluşturulamazsa uygun bir hata mesajı gönderin
          res.status(500).json({ error: 'Proje oluşturulamadı' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Sunucu hatası' });
  }
};

const getProjects = async (req, res) => {
  try {
      const { creatorID } = req.query;

      const projects = await Project.find({ creatorID: creatorID });

      const customerIds = projects.map(project => project.customer);

      const customers = await Customer.find({ _id: { $in: customerIds } });


      const projectsWithCustomerNames = projects.map(project => {
        let customerName = 'Bilinmeyen Müşteri';
    
        if (project.customer) {
            const customer = customers.find(c => c._id.toString() === project.customer.toString());
            if (customer) {
                customerName = `${customer.firstName} ${customer.lastName}`;
            }
        }
        return {
            ...project.toObject(),
            customerName: customerName
        };
    });
    

      res.status(200).json(projectsWithCustomerNames);

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Sunucu hatası' });
  }
};


  const getProjects2 = async (req, res) => {
    try {
        const { creatorID, selectedProject } = req.query;

        const projects = await Project.find({ creatorID: creatorID, projectName: selectedProject });

        if (projects.length > 0) {

          const customerid =projects[0].customer;
            const customer = await Customer.findOne({ _id: customerid });

            if (customer && customer.firstName && customer.lastName) {
                const name = customer.firstName + " " + customer.lastName;
                res.status(200).json({ name: name });
            } else {
                res.status(404).json({ error: 'Müşteri bilgisi bulunamadı' });
            }
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
          const project = await Project.findById(id);
          res.status(200).json(project);
      
      
        } catch (error) {
          res.status(500).json({message:"server hatası."})
        }
  }
  const deleteProject= async(req,res)=>{
  
    try {
      const {projectId}= req.query;
      
      const project = await Project.findByIdAndDelete(projectId);
  
      if(!project){
       
        res.status(404).json({succeed:false,message:"Project was not found"})
      }
      res.status(200).json({succeed:true,message:"Project has been deleted succesfully" })
     
    } catch (error) {
      
      
    }
  }
  

export{addProject,getProjects,projectDetails,deleteProject,getProjects2}