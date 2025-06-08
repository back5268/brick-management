import { getData, putData } from '@lib/axios';

export const getListTemplateApi = (params) => getData('/web/template/getListTemplate', params);
export const updateTemplateApi = (params) => putData('/web/template/updateTemplate', params);
