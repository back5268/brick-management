import { createWarehouse, deleteWarehouse, detailWarehouse, getListWarehouse, updateWarehouse } from '@controller';
import express from 'express';

export const warehouseRouter = express.Router();

warehouseRouter.get('/getListWarehouse', getListWarehouse);
warehouseRouter.get('/detailWarehouse', detailWarehouse);
warehouseRouter.delete('/deleteWarehouse', deleteWarehouse);
warehouseRouter.post('/createWarehouse', createWarehouse);
warehouseRouter.put('/updateWarehouse', updateWarehouse);
