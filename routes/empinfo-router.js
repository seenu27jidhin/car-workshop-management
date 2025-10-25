import express from 'express';
import checkToken from '../middlewares/check-token.js';
import User from '../db/models/user-schema.js';

import multer from 'multer';
import Employee from '../db/models/emp-schema.js';
//import mongoose from 'mongoose';
//Ensure image folder exists
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });
const router = express.Router();
router.get('/', checkToken(['USER', 'ADMIN']), async (req, res) => {
  try {
    // const userId = userId;
    // console.log(userId);
    const empInfo = await Employee.find();
    // console.log(product);
    return res.status(200).json(empInfo);
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
      const { emp, ...restemp } = req.body;
      const userId = req.userId;

      const { gender, department, address, phoneno, dob, location, pincode } =
        req.body;
      // console.log(body);

      const empinfo = new Employee({
        gender,
        department,
        address,
        phoneno,
        dob,
        location,
        pincode,
        user: userId,
      });

      // Check if an Employee record already exists for this user
      const existing = await Employee.findOne({ emp });
      if (existing) {
        return res
          .status(400)
          .json({ message: 'Personal info already exists for this user.' });
      }
      // const id = localStorage.getItem(req.userId);
      // If not, create new record
      const empinfoCreate = await Employee.create({ emp, ...restemp });
      // console.log(productCreate);
      return res.status(200).json(empinfoCreate);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);
router.get('/employees', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [employees, total] = await Promise.all([
    Employee.find().skip(skip).limit(limit),
    Employee.countDocuments(),
  ]);
  res.json({ employees, total, page, pages: Math.ceil(total / limit) });
});
router.get('/:id/', checkToken(['USER', 'ADMIN']), async (req, res) => {
  try {
    const empinfo = await Employee.findById(req.params.id); // or User.findOne({ _id: req.params.id })
    // if (!empinfodet) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(empinfo);
    // res.json(empinfo);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
// ..update Employee Emp
router.patch('/:id', upload.none(), checkToken(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    // const { body } = req;
    const { gender, department, address, phoneno, dob, location, pincode } =
      req.body;
    // console.log(userId);
    //console.log(body);

    const productId = await Employee.findById(id);
    // console.log(productId);

    //const user = await User.findById(productId.user.toString());

    if (!productId)
      return res.status(404).json({ message: 'productId not found' });

    //console.log(user.id.toString());

    // if (productId.user.toString() !== user.id.toString())
    //   return res.status(403).json({ message: 'Forbidden: Not your course' });

    // ✅ Update fields including optional imageUrl
    const updatedFields = {
      gender,
      department,
      address,
      phoneno,
      dob,
      location,
      pincode,
    };

    await Employee.findByIdAndUpdate(id, updatedFields, { new: true });

    // await Product.findByIdAndUpdate(id, body);
    return res.status(200).json({ message: 'updated Successfully..!' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
// router.get(
//   '/byemployee/:userId',
//   checkToken(['ADMIN', 'MANAGER', 'CEO', 'SUPERVIOR', 'TEAM LEADERS']),
//   async (req, res) => {
//     try {
//       // const userId = userId;
//       // console.log(userId);
//       const userId = req.params.userId;
//       if (!mongoose.Types.ObjectId.isValid(userId)) {
//         return res.status(400).json({ error: 'Invalid userId' });
//       }
//       const compInfo = await Employee.find({
//         user: mongoose.Types.ObjectId(userId),
//       });
//       console.log(compInfo);
//       return res.status(200).json(compInfo);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
// );

router.get('/byemployee/:userId', checkToken(['ADMIN']), async (req, res) => {
  try {
    // const userId = userId;
    //console.log('csss', req.params.userId);
    const empInfo = await Employee.find({ user: req.params.userId }); // or .find()
    console.log(empInfo);
    return res.status(200).json(empInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
export default router;
