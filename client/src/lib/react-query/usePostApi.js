import { useMutation } from '@tanstack/react-query';

export const usePostApi = (apiFunction) => {
  return useMutation({
    mutationFn: (params) => apiFunction(params)
  });
};
