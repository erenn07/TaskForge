import User from '../models/User.js';



const getProfile =async (req,res)=>{
    try {
        const user= await User.findById(req.user._id);
        res.json(user)
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}


export{getProfile}