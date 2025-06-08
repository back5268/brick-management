import { createWarehouseReceipt, deleteWarehouseReceipt, detailWarehouseReceipt, getListWarehouseReceipt } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const warehouseReceiptRouter = express.Router();

warehouseReceiptRouter.get('/getListWarehouseReceipt', getListWarehouseReceipt);
warehouseReceiptRouter.get('/detailWarehouseReceipt', detailWarehouseReceipt);
warehouseReceiptRouter.delete('/deleteWarehouseReceipt', deleteWarehouseReceipt);
warehouseReceiptRouter.post('/createWarehouseReceipt', upload.fields([{ name: 'files', maxCount: 5 }]), createWarehouseReceipt);
