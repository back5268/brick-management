import { createCustomer, deleteCustomer, detailCustomer, getListCustomer, getListPriceByCustomer, updateCustomer } from '@controller';
import express from 'express';

export const customerRouter = express.Router();

customerRouter.get('/getListCustomer', getListCustomer);
customerRouter.get('/getListPriceByCustomer', getListPriceByCustomer);
customerRouter.get('/detailCustomer', detailCustomer);
customerRouter.delete('/deleteCustomer', deleteCustomer);
customerRouter.post('/createCustomer', createCustomer);
customerRouter.put('/updateCustomer', updateCustomer);
