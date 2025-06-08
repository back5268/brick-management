import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListCategoryApi = (params) => getData('/web/config/getListCategory', params);
export const detailCategoryApi = (params) => getData('/web/config/detailCategory', params);
export const deleteCategoryApi = (params) => deleteData('/web/config/deleteCategory', params);
export const createCategoryApi = (params) => postData('/web/config/createCategory', params);
export const updateCategoryApi = (params) => putData('/web/config/updateCategory', params);
