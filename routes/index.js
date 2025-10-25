import express from 'express';
import userRoutes from './user-routes.js';
import productRoutes from './product-router.js';
import cartRoutes from './cart-router.js';
import EmpInfoRoutes from './empinfo-router.js';
import CompanyInfoRoutes from './companyinfo-router.js';
import UserInfoRoutes from './userpersonal-router.js';
import userpersonalinfo from './userinfo-router.js';
import leaveInfo from './leaveinfo-router.js';
const router = express.Router();

router.use('/user', userRoutes);
router.use('/userinfo', UserInfoRoutes);
router.use('/userpersonalinfo', userpersonalinfo);
router.use('/product', productRoutes);
router.use('/cart', cartRoutes);
router.use('/empinfo', EmpInfoRoutes);
router.use('/companyinfo', CompanyInfoRoutes);
router.use('/leave', leaveInfo);

export default router;
