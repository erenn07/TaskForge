import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

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

    console.log("1:",user.password)
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("2:",user.password)
    console.log("3:",password)


    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1 hour'
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export { register, login };
