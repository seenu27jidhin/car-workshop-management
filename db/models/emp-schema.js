import mongoose, { Schema, model } from 'mongoose';
const empSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    default: 'India',
  },
  pincode: {
    type: Number,
    required: true,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    default: 'inactive',
    enum: ['inactive', 'active'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Employee = model('Emp', empSchema);

export default Employee;
