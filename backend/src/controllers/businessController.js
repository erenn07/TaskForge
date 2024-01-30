import Customer from "../models/Customer.js";
import User from "../models/User.js";
import Project from "../models/Project.js";
import Business from "../models/business.js";


const addBusiness = async (req, res) => {
    try {
      const { newRow } = req.body;
  
      console.log(newRow, "roowww");
      console.log(newRow.ProjectName);
  
      const business = await Business.create({
        projectName: newRow.ProjectName,
        tasks: newRow.projectTask,
        projectDescription: newRow.projectDescription,
        customer: newRow.CustomerName,
        creatorID:newRow.creatorID
      });
  
      res.status(200).json(business);
    } catch (error) {
      console.error("Error adding business:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  const getBusiness = async (req, res) => {
    try {
      const {creatorID} = req.query;
  
      console.log(creatorID, "creatorID businesss");

      const business = await Business.find({
        creatorID:creatorID
      });
  

console.log(business)

      res.status(200).json(business);
    } catch (error) {
      console.error("Error adding business:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };



  const deleteBusiness= async(req,res)=>{
  
    try {
      const {businessId}= req.query;
      
      const business = await Business.findByIdAndDelete(businessId);
  
      if(!business){
       
        res.status(404).json({succeed:false,message:"business was not found"})
      }
      res.status(200).json({succeed:true,message:"business has been deleted succesfully" })
     
    } catch (error) {
      
      
    }
  }
  

  
  export {addBusiness,getBusiness,deleteBusiness}