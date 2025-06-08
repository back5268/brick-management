import { createPermission, deletePermission, detailPermission, getListPermission, getListTool, updatePermission } from '@controller';
import express from 'express';

export const permissionRouter = express.Router();

permissionRouter.get('/getListPermission', getListPermission);
permissionRouter.get('/getListTool', getListTool);
permissionRouter.get('/detailPermission', detailPermission);
permissionRouter.delete('/deletePermission', deletePermission);
permissionRouter.post('/createPermission', createPermission);
permissionRouter.put('/updatePermission', updatePermission);
