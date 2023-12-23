import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { authenticate } from '../middlewares/auth.js';

const register = async (req, res, next) => {

  const { firstName,lastName, email,phone,password,passwordConfirmation} = req.body;

  try {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      return res.status(400).json({ success: false, message: 'Geçerli bir email adresi giriniz.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Bu email adresi zaten kullanımda. Lütfen başka bir email kullanın.' });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ success: false, message: 'Telefon numarası sadece sayı içermelidir ve 10 haneli olmalıdır.' });
    }

    const existingNumber = await User.findOne({ phone });
    if (existingNumber) {
      return res.status(400).json({ success: false, message: 'Bu telefon numarası zaten kullanımda. Lütfen başka bir telefon numarası kullanın.' });
    }

    if (password !==passwordConfirmation) {
      return res.status(400).json({
        success: false,
        message: 'Passwords are not matched',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName,lastName, email,phone, password: hashedPassword });
    await user.save();
    res.status(201).json({success:true, message: 'Registeration successful' });
  } catch (error) {
    res.status(400).json({success:false,message:"server error"})
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({email:email});
    if (!user) {
      return res.status(404).json({ message: 'Invalid email. Please try again later.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password'});
    }else{

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1 hour'
    });
 
    res.status(200).json({ success:true,token:token ,message:"Login successful"});
    }

    
  } catch (error) {
    next(error);
  }
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};  

export { register, login};
