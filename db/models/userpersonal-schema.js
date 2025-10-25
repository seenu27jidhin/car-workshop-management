import mongoose, { Schema, model } from 'mongoose';
const UserPersonalSchema = new mongoose.Schema({
  contactname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  city: {
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
  contactno: {
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

const UserPersonal = model('UserInfo', UserPersonalSchema);

export default UserPersonal;
