import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
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
        ref: 'Customer',
        required: true,
      },
      hourlyWage:{
        type:Number,
        required:false
      },
    tasks:[{
        type:String,
        required:false,
        ref:'Task'
    }],
    creatorID: {
      type:String,
      required:false
    }});

const Project = mongoose.model('Project', ProjectSchema);


export default Project; 





