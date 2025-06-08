import { createEmployee, deleteEmployee, detailEmployee, getListEmployee, resetPassword, updateEmployee } from '@controller';
import express from 'express';

export const employeeRouter = express.Router();

employeeRouter.get('/getListEmployee', getListEmployee);
employeeRouter.get('/detailEmployee', detailEmployee);
employeeRouter.delete('/deleteEmployee', deleteEmployee);
employeeRouter.post('/createEmployee', createEmployee);
employeeRouter.put('/updateEmployee', updateEmployee);
employeeRouter.put('/resetPassword', resetPassword);
