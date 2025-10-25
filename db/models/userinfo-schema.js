import mongoose, { Schema, model } from 'mongoose';
const UserInfoSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
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

const UserinfoPersonal = model('UserPersonalInfo', UserInfoSchema);

export default UserinfoPersonal;
