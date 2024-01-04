import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    taskName:{
        type:String,

    },
    taskId:{
        type:String,
        required:false
    },
    status:{
        type:String
    },  
    project:{
        type:String,
        required:false,
        ref:'Project'
    },
    });

const Task = mongoose.model('Task', TaskSchema);


export default Task; 





