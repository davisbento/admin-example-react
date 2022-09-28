import { useCallback, useEffect, useState } from 'react';

function useFetch<T>(apiCallback: () => Promise<T>, deps: Array<any>) {
  const [data, setData] = useState<T>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cb = useCallback(apiCallback, deps);

  const updateData = (newData: any) => {
    setData(newData);
  };

  const fetchData = useCallback(async () => {
    setData(undefined);
    setError(undefined);
    setLoading(true);
    try {
      const data = await cb();
      setData(data);
    } catch (e) {
      setError(e);
      setData(undefined);
    } finally {
      setLoading(false);
    }
  }, [cb]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, fetchData, updateData };
}

export default useFetch;
