import express from 'express';
import checkToken from '../middlewares/check-token.js';
import Cart from '../db/models/cart-schema.js';
import User from '../db/models/user-schema.js';
import Product from '../db/models/product-schema.js';

import multer from 'multer';

// Import Product model to ensure it's registered before being used in populate
import('../db/models/product-schema.js');

//Ensure image folder exists
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

const router = express.Router();

router.get('/', checkToken(['USER']), async (req, res) => {
  try {
    // const userId = userId;
    // console.log(userId);
    const cartProduct = await Cart.find();
    // console.log(product);
    return res.status(200).json(cartProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/add', checkToken(['USER', 'ADMIN']), async (req, res) => {
  try {
    const productId = req.body.productid[0].product;
    const quantity = req.body.productid[0].quantity;
    // console.log('admin', req.body);
    // console.log(productId);
    // Validate request body
    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and quantity are required',
      });
    }

    // Validate quantity
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1',
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = new Cart({
        user: req.userId,
        items: [{ product: productId, quantity: quantity }],
      });
    } else {
      // Check if product already exists in cart
      const itemIndex = cart.items.findIndex(
        item => item.product?.toString() === productId
      );

      if (itemIndex > -1) {
        // Update quantity if product exists
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item if product doesn't exist in cart
        cart.items.push({ product: productId, quantity: quantity });
      }
    }

    // Save cart
    await cart.save();

    // Fetch updated cart with populated product details
    const updatedCart = await Cart.findById(cart._id).populate('items.product');

    return res.status(200).json({
      success: true,
      data: updatedCart,
      message: 'Product added to cart successfully',
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to add product to cart',
      error:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Internal server error',
    });
  }
});

// GET /cart/items

router.get('/mycart', checkToken(['USER', 'ADMIN']), async (req, res) => {
  //const userId = req.userId;
  try {
    // Validate user ID
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: 'User ID not found in request',
      });
    }

    const cart = await Cart.findOne({ user: req.userId })
      .populate('items.product')
      .lean(); // Using lean() for better performance

    if (!cart) {
      return res.status(200).json({
        success: true,
        data: {
          items: [],
          total: 0,
        },
        message: 'Cart is empty',
      });
    }
    // Filter items where category is 'cart'
    const cartItems = cart.items.filter(item => item.category === 'CART');
    // Filter items where category is 'cart'
    const cartWishlistItems = cart.items.filter(
      item => item.category === 'WISHLIST'
    );
    // return res.json({ success: true, data: { ...cart, items: cartItems } });
    return res.status(200).json({
      success: true,
      data: { ...cart, items: cartItems, wishlistItems: cartWishlistItems },
      message: 'Cart retrieved successfully',
    });
    //  res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// --- Get product id and user id ---
router.get(
  '/user/:userId/product/:id',
  checkToken(['USER', 'ADMIN']),
  async (req, res) => {
    try {
      const { userId, id } = req.params;

      // console.log('vcv', req.userId);
      const cartproductId = await Cart.findOne({
        user: userId,
        'items.product': id,
      }).populate('items.product');
      return res.status(200).json(cartproductId);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
);
// --- Get Single Product ---
router.get('/:id', checkToken(['USER', 'ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    const cartproductId = await Cart.findById(id);
    return res.status(200).json(cartproductId);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post('/wishlist/add/user/:userId/product/:id', async (req, res) => {
  const { userId, id } = req.params;
  try {
    console.log('sss', id);
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    // Check if product already in cart
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === id
    );
    if (itemIndex > -1) {
      // If already in cart, just update category to wishlist
      cart.items[itemIndex].category = 'WISHLIST';
    } else {
      // Else, add as wishlist
      cart.items.push({
        product: id,
        category: 'WISHLIST',
      });
    }
    await cart.save();
    res.json({ success: true, message: 'Added to wishlist', cart });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/remove', checkToken(['ADMIN']), async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );
    await cart.save();

    res.json({ success: true, message: 'Item removed', cart });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
export default router;
