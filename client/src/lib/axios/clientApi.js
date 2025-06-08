import { getToastState } from '@store';
import axios from 'axios';

export const clientApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
});

const { showToast } = getToastState();
clientApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers['Bearer'] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

clientApi.interceptors.response.use(
  async function (res) {
    if (res.data?.status || res.data?.status === 0) {
      if (res.data.status) return res.data.data;
      else showToast({ title: res.data?.mess, severity: 'error' });
    }
    else return res.data
  },
  async function (error) {
    if (error) {
      showToast({ title: error?.response?.data?.mess || 'Đường truyền không ổn định vui lòng thử lại sau', severity: 'error' });
    }
  }
);
