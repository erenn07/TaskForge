import mongoose from 'mongoose';

const { Schema } = mongoose;

const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true 
    },
    lastName: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true, 
        unique: true 
    },
    phone: {
        type: String,
        required: true, 
        unique: true 
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project' 
    }],
    creatorID: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: false 
    }
});

const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer;
