import { cancelOrder, createOrder, detailOrder, exportOrder, getListOrder, previewOrder } from '@controller';
import express from 'express';

export const orderRouter = express.Router();

orderRouter.get('/getListOrder', getListOrder);
orderRouter.get('/detailOrder', detailOrder);
orderRouter.delete('/cancelOrder', cancelOrder);
orderRouter.post('/createOrder', createOrder);
orderRouter.get('/previewOrder', previewOrder);
orderRouter.get('/exportOrder', exportOrder);
