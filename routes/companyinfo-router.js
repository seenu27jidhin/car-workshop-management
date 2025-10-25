import express from 'express';
import checkToken from '../middlewares/check-token.js';
import User from '../db/models/user-schema.js';

import multer from 'multer';
import Company from '../db/models/company-schema.js';
//Ensure image folder exists
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

const router = express.Router();
router.get('/', checkToken(['ADMIN']), async (req, res) => {
  try {
    // const userId = userId;
    // console.log(userId);
    const CompInfo = await Company.find();
    // console.log(product);
    return res.status(200).json(CompInfo);
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
      const { user, ...rest } = req.body;
      const {
        joindate,
        salary,
        idnumber,
        idstartdate,
        idexpireddate,
        currentaddress,
        location,
        pincode,
      } = req.body;
      const userId = req.userId;
      const companyinfo = new Company({
        joindate,
        salary,
        idnumber,
        idstartdate,
        idexpireddate,
        currentaddress,
        location,
        pincode,
        user: userId,
      });

      // const id = req._id;
      console.log(companyinfo);
      // Check if an Employee record already exists for this user
      const existing = await Company.findOne({ user });
      if (existing) {
        return res
          .status(400)
          .json({ message: 'Personal info already exists for this user.' });
      }
      // If not, create new record
      const compinfoCreate = await Company.create({ user, ...rest });
      // console.log(productCreate);
      return res.status(200).json(compinfoCreate);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
);
// Get company info by userId
router.get('/companies', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [companies, total] = await Promise.all([
    Company.find().skip(skip).limit(limit),
    Company.countDocuments(),
  ]);
  res.json({ companies, total, page, pages: Math.ceil(total / limit) });
});
router.get('/:id/', checkToken(['ADMIN']), async (req, res) => {
  try {
    const compinfo = await Company.findById(req.params.id); // or User.findOne({ _id: req.params.id })
    // if (!empinfodet) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(compinfo);
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
    const {
      joindate,
      salary,
      idnumber,
      idstartdate,
      idexpireddate,
      currentaddress,
      location,
      pincode,
    } = req.body;
    // console.log(userId);
    //console.log(body);

    const companyId = await Company.findById(id);
    // console.log(productId);

    //const user = await User.findById(productId.user.toString());

    if (!companyId)
      return res.status(404).json({ message: 'companyId not found' });

    //console.log(user.id.toString());

    // if (productId.user.toString() !== user.id.toString())
    //   return res.status(403).json({ message: 'Forbidden: Not your course' });

    // ✅ Update fields including optional imageUrl
    const updatedFields = {
      joindate,
      salary,
      idnumber,
      idstartdate,
      idexpireddate,
      currentaddress,
      location,
      pincode,
      location,
      pincode,
    };

    await Company.findByIdAndUpdate(id, updatedFields, { new: true });

    // await Product.findByIdAndUpdate(id, body);
    return res.status(200).json({ message: 'updated Successfully..!' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
router.get(
  '/byemployee/:userId',
  checkToken(['ADMIN', 'MANAGER', 'CEO', 'SUPERVIOR', 'TEAM LEADERS']),
  async (req, res) => {
    try {
      // const userId = userId;
      //const { id } = req.params.userId;
      console.log('ids', req.params.userId);
      const compInfo = await Company.find({ user: req.params.userId });
      console.log(compInfo);
      return res.status(200).json(compInfo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);
export default router;
