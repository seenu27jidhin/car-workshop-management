import express, { text } from 'express';
import bcrypt, { hash } from 'bcryptjs';
import User from '../db/models/user-schema.js';
import jsonWebToken from 'jsonwebtoken';
import nodeMailer from 'nodemailer';
import checkToken from '../middlewares/check-token.js';
const router = express.Router();

router.get('/login', async (req, res) => {
  try {
    const userList = await User.find();
    console.log('list', userList);
    return res.status(200).json(userList);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
router.post('/signup', async (req, res) => {
  // const { name, email, password, role } = req.body;
  console.log('connected');
  try {
    const { body } = req;
    const user = await User.findOne({
      email: body.email,
      password: body.password,
    });
    if (user) {
      return res.status(400).json({ message: 'Email already taken' });
    }
    if (body.password != body.confirmPassword) {
      return res.status(400).json({ message: 'password dont match' });
    }

    // Generate unique registration number
    const year = new Date().getFullYear();

    // Find the highest existing registration number for this year
    const lastUser = await User.findOne({
      registrationNumber: { $regex: `^USER-${year}-` },
    }).sort({ registrationNumber: -1 });

    let counter = 1;
    if (lastUser && lastUser.registrationNumber) {
      // Extract the counter from the last registration number
      const lastCounter = parseInt(lastUser.registrationNumber.split('-')[2]);
      counter = lastCounter + 1;
    }

    const regno = `USER-${year}-${String(counter).padStart(4, '0')}`;
    console.log('Generated registration number:', regno);

    const hashedPassword = await bcrypt.hash(body.password, 2);
    const newUser = await User.create({
      ...body,
      password: hashedPassword,
      registrationNumber: regno,
      role: 'USER',
    });

    return res.status(201).json({ message: 'Account has been created' });

    //console.log(user);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
router.post('/signupadmin', async (req, res) => {
  // const { name, email, password, role } = req.body;
  console.log('admin connected');
  const role = '';
  const status = '';

  try {
    const { body } = req;
    const user = await User.findOne({
      email: body.email,

      password: body.password,
    });
    if (user) {
      return res.status(400).json({ message: 'Email already taken' });
    }

    if (body.password != body.confirmPassword) {
      return res.status(400).json({ message: 'password dont match' });
    }
    // if (body.role != 'ADMIN') {
    //   role = body.role;
    // } else {
    //   role = 'ADMIN';
    // }
    // Generate unique registration number
    const year = new Date().getFullYear();

    // Find the highest existing registration number for this year
    const lastUser = await User.findOne({
      registrationNumber: { $regex: `^ADMIN-${year}-` },
    }).sort({ registrationNumber: -1 });

    let counter = 1;
    if (lastUser && lastUser.registrationNumber) {
      // Extract the counter from the last registration number
      const lastCounter = parseInt(lastUser.registrationNumber.split('-')[2]);
      counter = lastCounter + 1;
    }

    const regno = `ADMIN-${year}-${String(counter).padStart(4, '0')}`;
    console.log('Generated registration number:', regno);

    const hashedPassword = await bcrypt.hash(body.password, 2);
    const newUser = await User.create({
      ...body,
      registrationNumber: regno,
      password: hashedPassword,
      role: 'ADMIN',
      status: 'active',
    });
    console.log(newUser);
    return res.status(201).json({ message: 'Account has been created' });

    //console.log(user);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
router.post('/signupemp', async (req, res) => {
  // const { name, email, password, role } = req.body;
  // console.log('connected');

  try {
    const { body } = req;
    const user = await User.findOne({
      email: body.email,
      password: body.password,
      role: body.role,
    });
    if (user) {
      return res.status(400).json({ message: 'Email already taken' });
    }

    if (body.password != body.confirmPassword) {
      return res.status(400).json({ message: 'password dont match' });
    }
    // if (body.role != 'ADMIN') {
    //   role = body.role;
    // } else {
    //   role = 'ADMIN';
    // }
    // Generate unique registration number
    const year = new Date().getFullYear();

    // Find the highest existing registration number for this year
    const lastUser = await User.findOne({
      registrationNumber: { $regex: `^EMP-${year}-` },
    }).sort({ registrationNumber: -1 });

    let counter = 1;
    if (lastUser && lastUser.registrationNumber) {
      // Extract the counter from the last registration number
      const lastCounter = parseInt(lastUser.registrationNumber.split('-')[2]);
      counter = lastCounter + 1;
    }

    const regno = `EMP-${year}-${String(counter).padStart(4, '0')}`;
    console.log('Generated registration number:', regno);

    const hashedPassword = await bcrypt.hash(body.password, 2);
    const role = body.role;
    const newUser = await User.create({
      ...body,
      registrationNumber: regno,
      password: hashedPassword,
      role: role,
    });

    return res.status(201).json({ message: 'Account has been created' });

    //console.log(user);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
router.post('/login', async (req, res) => {
  //const { email, password } = req.body;

  try {
    const { body } = req;
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(400).json({ message: 'Email or Password incorrect' });
    }
    console.log('userid', user._id);
    const isMatching = await bcrypt.compare(body.password, user.password);
    if (!isMatching) {
      return res.status(400).json({ message: 'Email or Password incorrect' });
    }
    const key = 'hdhsbjfjdxcbudiweowosszxmznbcjxbjvbxj7637bjfbdj234';
    const token = jsonWebToken.sign(
      { user_id: user._id, user_name: user.name, role: user.role },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: '4d',
      }
    );

    //localStorage.setItem('userId', user._id);
    //console.log(token.user_id);
    //const id = token.userid;
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'seenujose08@gmail.com',
        pass: 'Seenu@jose_08',
      },
    });

    const mailOptions = {
      from: 'seenujose08@gmail.com',
      to: body.email,
      subject: 'Welcome Mail',
      text: `Hello Friend,
                    Thank You For Logigin In`,
    };
    // res.json({ token });
    // transporter.sendMail(mailOptions, (e, i) => {
    //   console.log(e);
    //   console.log(i);
    return res.status(200).json({ message: 'Login Successful', token });
    // });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});
router.put('/:id/status', checkToken(['ADMIN']), async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Update only the status field
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Status updated', user: updatedUser });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
router.get('/:id/', checkToken(['USER', 'ADMIN']), async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // or User.findOne({ _id: req.params.id })
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
router.post('/validatetoken', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res
        .status(400)
        .json({ isValid: false, message: 'Token is missing' });
    }

    const decoded = jsonWebToken.verify(token, process.env.TOKEN_SECRET_KEY);

    // Send back decoded info (e.g., userId)
    return res.status(200).json({
      isValid: true,
      userId: decoded.userId, // 👈 This is from the token payload
    });
    //console.log(decoded.user_name);
  } catch (e) {
    console.error('Token validation error:', e.message);
    return res.status(403).json({ isValid: false, message: 'Invalid token' });
  }
});
router.get('/login/emplist', async (req, res) => {
  try {
    const empList = await User.find({ role: { $ne: 'USER' } });
    console.log('list', empList);
    return res.status(200).json(empList);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
export default router;
