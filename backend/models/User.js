const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['resident', 'caretaker'], required: true },
  idVerification: {
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    document: { type: String }, // URL or path to the uploaded document
  },
});
userSchema.pre('save',async function (next){
    if (!this.isModified('password')) {
    return next(); // Skip hashing if the password hasn't been modified
  }
  try{
    this.password=await bcrypt.hash(this.password,10);
    next();
  }
  catch (error) {
    next(error); // Pass error to the next middleware
  }
 
});

userSchema.methods.comparePassword = async function (candidatePassword) {
     console.log('Candidate Password:', candidatePassword);
        console.log('Hashed Password:', this.password);
  return  bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);