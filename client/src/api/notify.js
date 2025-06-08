import { getData, putData } from '@lib/axios';

export const getListNotifyApi = (params) => getData('/web/notify/getListNotify', params);
export const viewAllNotifyApi = (params) => putData('/web/notify/viewAllNotify', params);
export const readNotifyApi = (params) => putData('/web/notify/readNotify', params);
export const readAllNotifyApi = (params) => putData('/web/notify/readAllNotify', params);

