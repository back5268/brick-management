import { getDataDashboard } from '@controller';
import express from 'express';

export const dashboardRouter = express.Router();

dashboardRouter.get('/getDataDashboard', getDataDashboard);
