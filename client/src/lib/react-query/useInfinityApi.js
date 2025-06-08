import { useInfiniteQuery } from '@tanstack/react-query';

export const useInfinityApi = (apiFunction, queryKey, limit = 10) => {
  return useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }) => apiFunction({ page: pageParam, limit }),
    getNextPageParam: (lastPage) => (lastPage?.nextPage ? lastPage.nextPage : undefined),
    initialPageParam: 1
  });
};
