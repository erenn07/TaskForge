import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProjectSchema = new Schema({
    projectName: {
        type: String,
        required: true 
    },
    projectDescription: {
        type: String,
        required: false 
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer', 
        required: false 
    },
    hourlyWage: {
        type: Number,
        required: false 
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task' 
    }],
    creatorID: {
        type: String,
        required: false 
    }
});

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
