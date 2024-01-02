import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    projectName:{
        type:String,
        required:false
    },
    customer:{
        type:String,
        required:false,
        ref:'Customer'
    },
    tasks:[{
        type:String,
        required:false,
        ref:'Task'
    }],
    });

const Project = mongoose.model('Project', ProjectSchema);


export default Project; 





