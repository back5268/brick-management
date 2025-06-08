import express from 'express';
import { authMiddleware, permissionMiddleware } from '@middleware';
import { dashboardRouter } from './dashboard';
import { employeeRouter } from './employee';
import { configRouter } from './config';
import { customerRouter } from './customer';
import { orderRouter } from './order';
import { permissionRouter } from './permission';
import { warehouseRouter } from './warehouse';
import { warehouseReceiptRouter } from './warehouseReceipt';

export const webRouter = express.Router();

webRouter.use(authMiddleware, permissionMiddleware);
webRouter.use('/config', configRouter);
webRouter.use('/customer', customerRouter);
webRouter.use('/dashboard', dashboardRouter);
webRouter.use('/employee', employeeRouter);
webRouter.use('/order', orderRouter);
webRouter.use('/permission', permissionRouter);
webRouter.use('/warehouse', warehouseRouter);
webRouter.use('/warehouse-receipt', warehouseReceiptRouter);
