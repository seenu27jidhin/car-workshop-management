import mongoose, { Schema, model } from 'mongoose';
const userSchema = new mongoose.Schema({
  registrationNumber: { type: String, default: 'Emp-0' },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    trim: true,
    default: 'http://localhost:3000/uploads/no-image.avif',
  },
  role: {
    type: String,
    default: 'USER',
    enum: [
      'USER',
      'EMPLOYEE',
      'ADMIN',
      'CEO',
      'MANAGER',
      'SUPERVIOR',
      'TEAM LEADERS',
    ],
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

const User = model('Users', userSchema);

export default User;
