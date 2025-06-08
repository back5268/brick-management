import { clientApi } from './clientApi';
import { convertData, createFormData } from './handleData';

export const getData = (url, params, blob = false, timeout = 600000) => {
  params = convertData(params);
  if (blob)
    return clientApi.get(url, {
      params,
      timeout,
      responseType: 'blob',
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  else return clientApi.get(url, { params });
};

export const postData = (url, data, isUpload = false, blob = false, timeout = 600000) => {
  if (isUpload || blob) {
    const { formData, ...params } = data;
    data = createFormData(params, formData);
  } else data = convertData(data);
  if (blob)
    return clientApi.post(url, data, {
      timeout,
      responseType: 'blob',
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  else if (isUpload) return clientApi.post(url, data, { timeout, headers: { 'Content-Type': 'multipart/form-data' } });
  else return clientApi.post(url, data, { timeout });
};

export const putData = (url, data, isUpload = false, blob = false, timeout = 600000) => {
  if (isUpload || blob) {
    const { formData, ...params } = data;
    data = createFormData(params, formData);
  } else data = convertData(data);
  if (blob)
    return clientApi.put(url, data, {
      timeout,
      responseType: 'blob',
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  else if (isUpload) return clientApi.put(url, data, { timeout, headers: { 'Content-Type': 'multipart/form-data' } });
  else return clientApi.put(url, data, { timeout });
};

export const deleteData = (url, data) => {
  return clientApi.delete(url, { data: convertData(data) });
};
