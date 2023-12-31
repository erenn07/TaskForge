import Customer from "../models/Customer.js";
import User from "../models/User.js";

const addCustomer= async(req,res)=>{
    try {
      
      const {name, surname,phone,email,projectName,userId} = req.body;

      console.log("add customer ici ",userId)

      const isEmailValid = validateEmail(email);
      if (!isEmailValid) {
        return res.status(400).json({ success: false, message: 'Geçerli bir email adresi giriniz.' });
      }

      if (!validatePhone(phone)) {
        return res.status(400).json({ success: false, message: 'Telefon numarası sadece sayı içermelidir ve 10 haneli olmalıdır.' });
      }

      const customer = await Customer.create({
        firstName:name,
        lastName:surname,
        phone:phone,
        projectName:projectName,
        email:email,
        creatorID:userId
      })
        await customer.save();
        res.status(200).json({message:'customer added successfully'})
      
    } catch (error) {
      
    }
    }

    const getCustomers=async(req,res)=>{
        try {

          const user=req.user
          console.log(user)
          const { userId } = req.query;
          const customer = await Customer.find({creatorID:userId});
         // const customers = customer.customers;
          console.log("musteriler",customer)

          res.status(200).json({customer})

        } catch (error) {
            
        }
    }
    const deleteCustomer = async (req, res) => {
      try {
       const {id}=req.query
    
        const deletedCustomer = await Customer.findByIdAndDelete(id);     
    
        if (!deletedCustomer) {
          console.log('No data to delete was found');
          return res.status(404).send('No data to delete was found');
        }
    
         res.status(200).send('customer deleted successfully');
      } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
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
    

    export{addCustomer,getCustomers,deleteCustomer}