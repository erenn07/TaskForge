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


export{getProfile}