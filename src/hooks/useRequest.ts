import { useMemo } from 'react';
import useSWR from 'swr';

export function useRequest<Data = any, Error = any>(url: string, fetcher: () => Promise<Data>) {
  const { data, error, mutate } = useSWR<Data, Error>(url, fetcher, {
    revalidateOnFocus: false,
    errorRetryCount: 1,
    refreshInterval: 0
  });

  const isLoading = useMemo(() => !data && !error, [data, error]);

  return { data, error, isLoading, mutate };
}
