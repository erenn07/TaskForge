import mongoose from 'mongoose';

const BillsSchema = new mongoose.Schema(
  {
     
    project:{
        type:String,
        required:false,
        ref:'Project'
    },
    customer:{
        type:String,
        required:false,
        ref:'Customer'
    },
    
    date:{
        type:Date,
        required:false
    },
    finishdate:{
        type:Date,
        required:false
    },
    amount:{
        type:String,
        required:false
        
    },
    
    hourlyPrice:{
        type:String,
        required:false
        
    },
    totalHoursWorked:{
        type:String,
        required:false
        
    },
    creatorID: {
        type:String,
        required:false
      }
    
    });


const Bill = mongoose.model('Bill',BillsSchema);


export default Bill; 





