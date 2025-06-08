import express from 'express';
import { authMiddleware } from '@middleware';
import { getListBankInfo, getListCategoryInfo, getListCustomerInfo, getListEmployeeInfo, getListPriceByCustomer, getListWarehouseInfo } from '@controller';

export const infoRouter = express.Router();

infoRouter.use(authMiddleware)
infoRouter.get('/getListBankInfo', getListBankInfo);
infoRouter.get('/getListCategoryInfo', getListCategoryInfo);
infoRouter.get('/getListEmployeeInfo', getListEmployeeInfo);
infoRouter.get('/getListCustomerInfo', getListCustomerInfo);
infoRouter.get('/getListPriceByCustomerInfo', getListPriceByCustomer);
infoRouter.get('/getListWarehouseInfo', getListWarehouseInfo);
