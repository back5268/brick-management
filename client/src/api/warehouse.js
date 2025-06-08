import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListWarehouseApi = (params) => getData('/web/warehouse/getListWarehouse', params);
export const detailWarehouseApi = (params) => getData('/web/warehouse/detailWarehouse', params);
export const deleteWarehouseApi = (params) => deleteData('/web/warehouse/deleteWarehouse', params);
export const createWarehouseApi = (params) => postData('/web/warehouse/createWarehouse', params);
export const updateWarehouseApi = (params) => putData('/web/warehouse/updateWarehouse', params);
