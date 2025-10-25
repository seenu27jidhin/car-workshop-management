import mongoose, { Schema, model } from 'mongoose';
const LeaveSchema = new mongoose.Schema({
  noofdays: {
    // Changed from nofodays to noofdays
    type: Number,
    required: true,
    min: 1,
  },
  employee: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: ['Sick', 'Casual', 'Annual', 'Unpaid', 'Other', 'Emergency'], // Added Emergency
    required: true,
  },
  levfrom: {
    type: Date,
    required: true,
  },
  levto: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    default: 'request_lev',
    enum: [
      'Request Lev',
      'Lev Request Approved',
      'Lev Changed',
      'Lev Changed Accepted',
      'Lev Changed Approved',
      'Denied',
      'Lev Rejected',
    ],
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
LeaveSchema.pre('save', function (next) {
  if (this.levto < this.levfrom) {
    return next(new Error('levto date cannot be earlier than levfrom date'));
  }
  return next();
});
const Leave = mongoose.model('Leaves', LeaveSchema);

export default Leave;
