import { deleteData, getData, postData } from '@lib/axios';

export const getListWarehouseReceiptApi = (params) => getData('/web/warehouse-receipt/getListWarehouseReceipt', params);
export const detailWarehouseReceiptApi = (params) => getData('/web/warehouse-receipt/detailWarehouseReceipt', params);
export const deleteWarehouseReceiptApi = (params) => deleteData('/web/warehouse-receipt/deleteWarehouseReceipt', params);
export const createWarehouseReceiptApi = (params) => postData('/web/warehouse-receipt/createWarehouseReceipt', params, true);
