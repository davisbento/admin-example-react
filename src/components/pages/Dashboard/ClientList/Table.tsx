import { Button, Table, TablePaginationConfig } from 'antd';
import Column from 'antd/lib/table/Column';
import { IPaginateResponse } from 'interfaces/apiResponse';
import { IClientList } from 'interfaces/client';
import { memo } from 'react';

interface IProps {
  data: IPaginateResponse<IClientList[]>;
  loading: boolean;
  handleOpenModal: (user: IClientList) => void;
  handleChangePagination: (newPagination: TablePaginationConfig) => void;
}

const ClientTable = memo(({ data, loading, handleChangePagination, handleOpenModal }: IProps) => {
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
        <Column title='Name' dataIndex='name' />
        <Column title='Username' dataIndex='username' />
        <Column title='E-mail' dataIndex='email' />
        <Column
          title='#'
          dataIndex='action'
          render={(_, record: IClientList) => (
            <Button onClick={() => handleOpenModal(record)} type='primary'>
              Detalhes
            </Button>
          )}
        />
      </Table>
    </div>
  );
});

export default ClientTable;
