import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema(
  {
    projectName:{
        type:String,
        required:false
    },
    projectDescription:{
      type:String,
      required:false
  },
    customer: {
        type: String,
        //ref: 'Customer',
        required: false,
      },
    tasks:{
        type:String,
        required:false,
        //ref:'Task'
    },
    creatorID: {
      type:String,
      required:false
    }});

const Business = mongoose.model('Business', businessSchema);


export default Business; 





