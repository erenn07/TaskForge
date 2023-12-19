import User from '../models/User.js';



const getProfile = async(userId)=>{

    try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        throw error;
      }
}


export{getProfile}