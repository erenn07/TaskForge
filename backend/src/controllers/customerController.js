import Customer from "../models/Customer.js";
import User from "../models/User.js";


const addCustomer= async(req,res)=>{
    try {
      const {firstName, lastName,phone,email,projectName} = req.body;

      const isEmailValid = validateEmail(email);
      if (!isEmailValid) {
        return res.status(400).json({ success: false, message: 'Geçerli bir email adresi giriniz.' });
      }

      if (!validatePhone(phone)) {
        return res.status(400).json({ success: false, message: 'Telefon numarası sadece sayı içermelidir ve 10 haneli olmalıdır.' });
      }

      const customer = await Customer.create({
        firstName:firstName,
        lastName:lastName,
        phone:phone,
        projectName:projectName,
        email:email,
        creatorID:req.user._id
      })
        await customer.save();
        res.status(200).json({message:'customer added successfully'})
      
    } catch (error) {
      
    }
    }

    const getCustomers=async(req,res)=>{
        try {
          const user = User.findById(req.user._id);
          const customers = user.customers;
          console.log("musteriler",customers)
        } catch (error) {
            
        }
    }

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phone);
    };  
    

    export{addCustomer,getCustomers}