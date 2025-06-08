import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListCustomerApi = (params) => getData('/web/customer/getListCustomer', params);
export const detailCustomerApi = (params) => getData('/web/customer/detailCustomer', params);
export const deleteCustomerApi = (params) => deleteData('/web/customer/deleteCustomer', params);
export const createCustomerApi = (params) => postData('/web/customer/createCustomer', params);
export const updateCustomerApi = (params) => putData('/web/customer/updateCustomer', params);
export const getListPriceByCustomerApi = (params) => getData('/web/customer/getListPriceByCustomer', params);
