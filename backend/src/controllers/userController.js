import Customer from '../models/Customer.js';
import User from '../models/User.js';



const getProfile = async(req,res)=>{
    try {
        const user= await User.findById(req.user._id);
        console.log(user)
        return user; 
      } catch (error) {
        throw error;
      }
}
const getInfo = async(req,res)=>{
  try {
    const {Id}= req.body;
    console.log("ıd bu:",Id)
      const user= await Customer.findOne(Id);
      
      res.status(200).json(user);
    } catch (error) {
      throw error;
    }
}



export{getProfile,getInfo}