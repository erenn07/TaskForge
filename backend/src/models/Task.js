import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    taskName:{
        type:String,

    },
    description:{
        type:String,
        required:false
    },
    point:{
        type:Number,
        min:0,
        max:100
    },
    status:{
        type:String
    },  
    projects:{
        type:String,
        required:false,
        ref:'Project'
    },
    });

const Task = mongoose.model('Task', TaskSchema);


export default Task; 





