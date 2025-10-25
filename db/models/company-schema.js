import mongoose, { Schema, model } from 'mongoose';
const companySchema = new mongoose.Schema({
  joindate: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
    trim: true,
  },
  idnumber: {
    type: String,
    required: true,
    trim: true,
  },
  idstartdate: {
    type: String,
    required: true,
  },
  idexpireddate: {
    type: String,
    required: true,
  },
  currentaddress: {
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
    default: 'active',
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

const Company = model('Companies', companySchema);

export default Company;
