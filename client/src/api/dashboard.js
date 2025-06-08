import { getData } from '@lib/axios';

export const getDataDashboardApi = (params) => getData('/web/dashboard/getDataDashboard', params);
