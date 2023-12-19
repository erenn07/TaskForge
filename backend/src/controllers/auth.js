import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { authenticate } from '../middlewares/auth.js';

const register = async (req, res, next) => {

  console.log("register calıstı")
  const { firstName,lastName, email,phone,password } = req.body;

  try {
    console.log("burdayım be burdayım")
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName,lastName, email,phone, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Registeration successfull' });
  } catch (error) {
    res.status(400).json({message:"server error"})
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({email:email});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }else{

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1 hour'
    });
    // console.log("mesaj",req.user)
    // console.log("mesaj222",req.user.email)
    res.status(200).json({ success:true,token:token });
    }

    
  } catch (error) {
    next(error);
  }
};

const checkUser=async(req,res)=>{

  // const userId=req.user
  
  
  //     if(req.user){
  
  //       return res.json({loggedIn:true,userId})
  
  //     }
  //   else {
  
  //     return res.json({loggedIn:false})
  
  //   }
  
  } 
  

export { register, login ,checkUser};
