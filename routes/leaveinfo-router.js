import express from 'express';
import checkToken from '../middlewares/check-token.js';
import User from '../db/models/user-schema.js';
import { body, validationResult } from 'express-validator';
import multer from 'multer';
import Leave from '../db/models/leave-schema.js';

//import mongoose from 'mongoose';
const router = express.Router();

const upload = multer();
//Ensure image folder exists

router.get(
  '/',
  checkToken(['EMPLOYEE', 'ADMIN', 'MANAGER']),
  async (req, res) => {
    try {
      const levInfo = await Leave.find();

      return res.status(200).json(levInfo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

router.post(
  '/',
  checkToken(['EMPLOYEE', 'ADMIN', 'MANAGER']),
  upload.none(),
  async (req, res) => {
    try {
      const { body } = req;

      const { employee, noofdays, category, levfrom, levto, reason } = req.body;
      if (!employee || !noofdays || !category || !levfrom || !levto) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const leave = await Leave.create({
        employee,
        noofdays: Number(noofdays),
        category,
        levfrom: new Date(levfrom),
        levto: new Date(levto),
        reason: reason || '',
        user: req.userId,
      });

      return res.status(201).json({ message: 'Leave created', data: leave });
    } catch (err) {
      console.error('Create leave error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);
router.get('/leavespopulated', async (req, res) => {
  try {
    const { body } = req;
    console.log(req.query.limit);
    const {
      page = Math.max(parseInt(req.query.page ?? '1', 10), 1),
      limit = Math.max(parseInt(req.query.limit ?? '10', 10), 1),
      search,
      category,
      status,
      fromDate,
      toDate,
    } = req.query;
    console.log('ddd body', req.query);
    // Build the filter object
    const filter = {};
    console.log(req.search);
    // Search by registration number or employee name
    if (search) {
      console.log('ddd');
      try {
        console.log('🔍 Found employees:', employees.length);
        const employees = await User.find({
          $or: [
            { registrationNumber: { $regex: search, $options: 'i' } },
            { name: { $regex: search, $options: 'i' } },
          ],
        }).select('_id');
        console.log('🔍 Found employees:', employees.length);
        const employeeIds = employees.map(emp => emp._id);
        filter.employee = { $in: employeeIds };
      } catch (searchError) {
        console.error('❌ Search error:', searchError);
        // If search fails, don't filter by employee
        console.log('⚠️ Skipping employee search due to error');
      }
    }
    // Filter by category
    if (category && category !== 'All Category') {
      filter.category = category;
      console.log('📂 Filtering by category:', category);
    }

    // Filter by status
    if (status && status !== 'All Status') {
      filter.status = status;
      console.log('📊 Filtering by status:', status);
    }

    // Filter by date range
    if (fromDate) {
      filter.levfrom = { $gte: new Date(fromDate) };
    }
    if (toDate) {
      filter.levto = { $lte: new Date(toDate) };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Leave.countDocuments(filter);

    // Get leaves with populated employee info
    const leaves = await Leave.find(filter)
      .populate('employee', 'name registrationNumber email department position')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    console.log(leaves);
    res.json({
      data: leaves,
      totals: total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
    console.log('📤 Sending response:', JSON.stringify(response, null, 2));
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// router.get('/leavespopulated', async (req, res) => {
//   try {
//     const page = Math.max(parseInt(req.query.page ?? '1', 10), 1);
//     const limit = Math.max(parseInt(req.query.limit ?? '10', 10), 1);
//     const skip = (page - 1) * limit;

//     const result = await Leave.aggregate([
//       {
//         $sort: { createdAt: -1 },
//       },
//       {
//         $lookup: {
//           from: 'users', // collection name (lowercase plural of model 'User')
//           localField: 'employee',
//           foreignField: '_id',

//           as: 'employeeInfo',
//         },
//       },
//       { $unwind: '$employeeInfo' },
//       {
//         $facet: {
//           data: [{ $skip: skip }, { $limit: limit }],
//           meta: [{ $count: 'total' }],
//         },
//       },
//     ]);
//     const data = result[0]?.data ?? [];
//     const totals = result[0]?.meta?.[0]?.total ?? 0;
//     res.json({
//       data,
//       page,
//       limit,
//       totals,
//       totalPages: Math.ceil(totals / limit),
//     });
//     // console.log(result[0]?.data);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

export default router;
