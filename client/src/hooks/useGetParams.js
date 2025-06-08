import { useLocation } from 'react-router-dom';

export const useGetParams = () => {
  const location = useLocation();
  const params = {};
  params.page = 1;
  params.limit = 10;
  const queryParams = new URLSearchParams(location.search);
  for (let [key, value] of queryParams.entries()) {
    if (value.includes(',')) {
      const array = value.split(',');
      params[key] = array.map((a) => (Number(a) || Number(a) === 0 ? Number(a) : a));
    } else params[key] = Number(value) || Number(value) === 0 ? Number(value) : value;
  }
  return params;
};
