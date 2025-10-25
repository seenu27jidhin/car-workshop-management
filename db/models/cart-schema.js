import mongoose, { Schema, model } from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
  },
  quantity: { type: Number, default: 1 },
  category: {
    type: String,
    default: 'CART',
    enum: ['CART', 'WISHLIST'],
  },
});

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
// Update the updatedAt timestamp before saving
CartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});
const Cart = model('Cart', CartSchema);

export default Cart;
