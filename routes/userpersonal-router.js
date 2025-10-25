import express from 'express';
import checkToken from '../middlewares/check-token.js';
import User from '../db/models/user-schema.js';

import multer from 'multer';
import UserInfo from '../db/models/userpersonal-schema.js';
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
    const userInfo = await UserInfo.find();
    // console.log(product);
    return res.status(200).json(userInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post(
  '/',
  checkToken(['USER']),
  upload.single('image'),
  async (req, res) => {
    //console.log(req);

    try {
      const { body } = req;
      // const { filename } = req.file;
      //console.log(req.userId);
      const { emp, ...restemp } = req.body;
      const userId = req.userId;

      const {
        contactname,
        address,
        street,
        landmark,
        city,
        location,
        pincode,
        contactno,
      } = req.body;
      // console.log(body);

      const userinfo = new UserInfo({
        contactname,
        address,
        street,
        landmark,
        city,
        location,
        pincode,
        contactno,
        user: userId,
      });

      // Check if an Employee record already exists for this user

      // const id = localStorage.getItem(req.userId);
      // If not, create new record
      const UserInfoCreate = await UserInfo.create({ emp, ...restemp });
      // console.log(productCreate);
      return res.status(200).json(UserInfoCreate);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);
router.get('/by-user/:userId', checkToken(['USER']), async (req, res) => {
  try {
    // const userId = userId;
    const userId = req.userId;
    console.log(userId);
    const userInfo = await UserInfo.find({ user: req.params.userId });
    console.log(userInfo);
    return res.status(200).json(userInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
export default router;
