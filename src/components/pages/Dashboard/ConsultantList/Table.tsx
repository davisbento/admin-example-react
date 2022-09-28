import { Button, Table, TablePaginationConfig } from 'antd';
import Column from 'antd/lib/table/Column';
import { IPaginateResponse } from 'interfaces/apiResponse';
import { IConsultantList } from 'interfaces/consultant';
import { memo } from 'react';

interface IProps {
  data: IPaginateResponse<IConsultantList[]>;
  loading: boolean;
  handleChangePagination: (newPagination: TablePaginationConfig) => void;
  handleOpenDetails: (consultant: IConsultantList) => void;
}

export const ConsultantTable = memo(({ data, loading, handleChangePagination, handleOpenDetails }: IProps) => {
  return (
    <div>
      <Table
        rowKey='id'
        loading={loading}
        onChange={pagination => handleChangePagination(pagination)}
        dataSource={loading ? [] : data?.data}
        pagination={{
          total: data?.pagination?.total || 0,
          pageSize: data?.pagination?.pageSize,
          current: data?.pagination?.page
        }}
      >
        <Column title='Nome Inteiro' dataIndex='fullName' />
        <Column title='Nome Exibição' dataIndex='displayName' />
        <Column title='Username' dataIndex='username' />
        <Column title='E-mail' dataIndex='email' />
        <Column
          title='#'
          dataIndex='action'
          render={(_, record: IConsultantList) => (
            <div className='flex-start-column'>
              <Button type='primary' onClick={() => handleOpenDetails(record)}>
                Detalhes
              </Button>
            </div>
          )}
        />
      </Table>
    </div>
  );
});
