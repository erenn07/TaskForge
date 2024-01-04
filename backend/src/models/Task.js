import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    taskName:{
        type:String,
        reuqired:false
    },
    taskId:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:false
    },  
    project:{
        type:String,
        required:false,
        ref:'Project'
    },
    });

const Task = mongoose.model('Task', TaskSchema);


export default Task; 





