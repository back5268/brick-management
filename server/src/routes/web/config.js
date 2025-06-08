import { createCategory, deleteCategory, detailCategory, getListCategory, updateCategory } from '@controller';
import express from 'express';

export const configRouter = express.Router();

configRouter.get('/getListCategory', getListCategory);
configRouter.get('/detailCategory', detailCategory);
configRouter.delete('/deleteCategory', deleteCategory);
configRouter.post('/createCategory', createCategory);
configRouter.put('/updateCategory', updateCategory);
