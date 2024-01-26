import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
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
    projectName: {
      type: String,
      required: false,

    },
    projectDescription: {
      type: String,
      required: false,

    },
    creatorID: {
      type: String,
      required: false
    }
  },
);

const Customer = mongoose.model('Customer', CustomerSchema);


export default Customer; 
