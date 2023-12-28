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

const addCustomer= async(req,res)=>{
try {
  const {firstName, lastName,phone,email,projectName} = req.body;

  const customer = await Customer.create({
    firstName:firstName,
    lastName:lastName,
    phone:phone,
    projectName:projectName,
    email:email
  })
    await customer.save();
    res.status(200).json({message:'customer added successfully'})
  
} catch (error) {
  
}
}


export{getProfile,addCustomer}