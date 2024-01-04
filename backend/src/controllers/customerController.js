import Customer from "../models/Customer.js";
import User from "../models/User.js";
import Project from "../models/Project.js";

const addCustomer= async(req,res)=>{
    try {
      
      const {name, surname,phone,email,projectName,userId} = req.body;

      const isEmailValid = validateEmail(email);
      if (!isEmailValid) {
        return res.status(402).json({ success: false, message: 'Geçerli bir email adresi giriniz.' });
      }

      if (!validatePhone(phone)) {
        return res.status(400).json({ success: false, message: 'Telefon numarası sadece sayı içermelidir ve 10 haneli olmalıdır.' });
      }

      const existingUser = await Customer.findOne({ email });
      if (existingUser) {
        return res.status(401).json({ success: false, message: 'Bu email adresi zaten kullanımda. Lütfen başka bir email kullanın.' });
      }

      const existingNumber = await Customer.findOne({ phone });
      if (existingNumber) {
        return res.status(400).json({ success: false, message: 'Bu telefon numarası zaten kullanımda. Lütfen başka bir telefon numarası kullanın.' });
      }

      const customer = await Customer.create({
        firstName:name,
        lastName:surname,
        phone:phone,
        projectName:projectName,
        email:email,
        creatorID:userId,
      })
/*         await customer.save();
 */
        const findCustomer = await Customer.findOne({email:email})
        const customerId=findCustomer._id.toString();
        console.log("CustomerID VALUE:",customerId) 
        
        const project = await Project.create({
          projectName: projectName,
          customer: customerId,
          creatorID:customer.creatorID,
        });
        await project.save();
         
        res.status(200).json({
          message: 'customer added successfully',
          userId: customerId,
          email: email,
          projectName: projectName
        });
      
    } catch (error) {
      console.error('Müşteri eklenirken hata:', error);
      res.status(500).json({ success: false, message: 'İç Sunucu Hatası' });
    }
    }

const getCustomers = async (req, res) => {
  try {

         
          const { userId } = req.query;
          console.log("duzenlenmisuserIDdegeri:",userId)
          const customer = await Customer.find({creatorID:userId});
          console.log("musteriler",customer)

    res.status(200).json({ customer })

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

const updateCustomer = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  console.log(updatedData, " datalar")

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Müşteri bulunamadı' });
    }


    for (let field in updatedData) {
      if (field !== 'creatorID') {
        customer[field] = updatedData[field];
      }

      console.log(field)
      console.log(updatedData[field])
    }

    await customer.save();

    return res.status(200).json({ success: true, message: 'Müşteri başarıyla güncellendi' });
  } catch (error) {
    console.error('Müşteri güncellenirken hata oluştu:', error);
    return res.status(500).json({ success: false, message: 'Müşteri güncellenirken bir hata oluştu' });
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


export { addCustomer, getCustomers, deleteCustomer, updateCustomer }