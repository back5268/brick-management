import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListPermissionApi = (params) => getData('/web/permission/getListPermission', params);
export const getListToolApi = (params) => getData('/web/permission/getListTool', params);
export const detailPermissionApi = (params) => getData('/web/permission/detailPermission', params);
export const deletePermissionApi = (params) => deleteData('/web/permission/deletePermission', params);
export const createPermissionApi = (params) => postData('/web/permission/createPermission', params);
export const updatePermissionApi = (params) => putData('/web/permission/updatePermission', params);
