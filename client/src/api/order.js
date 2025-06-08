import { deleteData, getData, postData } from '@lib/axios';

export const getListOrderApi = (params) => getData('/web/order/getListOrder', params);
export const previewOrderApi = (params) => getData('/web/order/previewOrder', params);
export const detailOrderApi = (params) => getData('/web/order/detailOrder', params);
export const createOrderApi = (params) => postData('/web/order/createOrder', params);
export const cancelOrderApi = (params) => deleteData('/web/order/cancelOrder', params);
export const exportOrderApi = (params) => getData('/web/order/exportOrder', params, true);
