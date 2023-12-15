
const login=async(req,res)=>{
    const {email,password}= req.body;

    const user = await UserModel.findOne({email:email});

if(user){
    const passwordMatch = await bcrypt.compare(password,user.password);

    if(passwordMatch){
        req.session.userId= user._id
        const token= jwt.sign({id:user.id},process.env.SECRET_TOKEN,{expiresIn:'1h', })

        return res.status(201).json({message:"User login successfully",token});
    }else{
        return res.status(401).json({succeded:false,error:"Passwords are not matched",})
    }
}else{
    return res.status(401).json({succeded:false,error:"There is no such a user",})
}

}