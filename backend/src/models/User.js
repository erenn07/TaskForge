import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName:{
      type: String,
      required: true,
    },
    lastName:{
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phone:{
      type: String,
      required: true,
      unique: true
    },
    _id: { type: mongoose.Schema.Types.ObjectId,
       required: true 
      },

  },
);

/* UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (error) {
      return next(error);
    }
  });
  
  UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  }; */

const User = mongoose.model('User', UserSchema);


export default User; 





