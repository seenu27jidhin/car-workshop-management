import express from 'express';
import checkToken from '../middlewares/check-token.js';
import Product from '../db/models/product-schema.js';
import User from '../db/models/user-schema.js';
import multer from 'multer';
// JWT middleware

//Ensure image folder exists
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

const router = express.Router();
router.get('/', checkToken(['USER', 'ADMIN', 'MANAGER']), async (req, res) => {
  try {
    // const userId = userId;
    // console.log(userId);
    const product = await Product.find();
    // console.log(product);
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post(
  '/',
  checkToken(['ADMIN', 'MANAGER']),
  upload.single('image'),
  async (req, res) => {
    //console.log(req);

    try {
      const { body } = req;
      // const { filename } = req.file;
      //console.log(req.userId);
      const userId = req.userId;
      const { title, description, price, category, model, stock } = req.body;
      console.log(userId);
      // console.log(body);
      const imageUrl = req.file
        ? `http://localhost:3000/uploads/${req.file.filename}`
        : null;

      const product = new Product({
        title,
        description,
        price,
        image: imageUrl,
        category,
        model,
        stock,
        user: userId,
      });

      // const id = localStorage.getItem(req.userId);
      const productCreate = await Product.create(product);
      // console.log(productCreate);
      return res.status(200).json(productCreate);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

router.get('/ProductList', async (req, res) => {
  try {
    const userId = req.userId; // ✅ Added in middleware
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = parseInt(req.query.limit) || 8; // default to 8 per page
    const skip = (page - 1) * limit;

    //console.log(userId);
    const product = await Product.find().skip(skip).limit(limit).lean();
    //console.log(product);
    return res.status(200).json({ product, page, limit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// ..edit Product
router.patch(
  '/editproduct/:id',
  checkToken(['ADMIN']),
  upload.single('image'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const { title, description, price, category, stock } = req.body;
      // console.log(userId);
      // console.log(body);
      const imageUrl = req.file
        ? `http://localhost:3000/uploads/${req.file.filename}`
        : null;

      const productId = await Product.findById(id);
      // console.log(productId);

      const user = await User.findById(productId.user.toString());

      if (!productId)
        return res.status(404).json({ message: 'productId not found' });

      //console.log(user.id.toString());

      if (productId.user.toString() !== user.id.toString())
        return res.status(403).json({ message: 'Forbidden: Not your course' });

      // ✅ Update fields including optional imageUrl
      const updatedFields = {
        title,
        description,
        price,
        category,
        stock,
      };

      if (imageUrl) {
        updatedFields.image = imageUrl;
      }

      await Product.findByIdAndUpdate(id, updatedFields, { new: true });

      // await Product.findByIdAndUpdate(id, body);
      return res.status(200).json({ message: 'updated Successfully..!' });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
);

// --- Get Single Product ---
router.get('/:id', checkToken(['USER', 'ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    const productId = await Product.findById(id);
    return res.status(200).json(productId);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

export default router;
