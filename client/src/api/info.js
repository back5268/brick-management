import { getData } from '@lib/axios';

export const getListBankInfoApi = (params) => getData('/info/getListBankInfo', params);
export const getListCategoryInfoApi = (params) => getData('/info/getListCategoryInfo', params);
export const getListMonthInfoApi = (params) => getData('/info/getListMonthInfo', params);
export const getListCustomerInfoApi = (params) => getData('/info/getListCustomerInfo', params);
export const getListEmployeeInfoApi = (params) => getData('/info/getListEmployeeInfo', params);
export const getListPriceByCustomerInfoApi = (params) => getData('/info/getListPriceByCustomerInfo', params);
export const getListWarehouseInfoApi = (params) => getData('/info/getListWarehouseInfo', params);
