import { TablePaginationConfig } from 'antd';
import { IPaginationRequest } from 'interfaces/pagination';
import { useCallback } from 'react';

export function usePagination(): [
  Readonly<IPaginationRequest>,
  (newPagination: TablePaginationConfig) => IPaginationRequest
] {
  const freezePagination = Object.freeze({ page: 1, pageSize: 20 });

  const handleChangePagination = useCallback((newPagination: TablePaginationConfig): IPaginationRequest => {
    return { page: newPagination.current, pageSize: newPagination.pageSize };
  }, []);

  return [freezePagination, handleChangePagination];
}
