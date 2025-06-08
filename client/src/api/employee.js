import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListEmployeeApi = (params) => getData('/web/employee/getListEmployee', params);
export const detailEmployeeApi = (params) => getData('/web/employee/detailEmployee', params);
export const deleteEmployeeApi = (params) => deleteData('/web/employee/deleteEmployee', params);
export const createEmployeeApi = (params) => postData('/web/employee/createEmployee', params);
export const updateEmployeeApi = (params) => putData('/web/employee/updateEmployee', params);
export const resetPasswordApi = (params) => putData('/web/employee/resetPassword', params);
