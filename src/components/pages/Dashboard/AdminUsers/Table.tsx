import { Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { IUser } from 'interfaces/user';
import { memo } from 'react';

interface IProps {
  data: IUser[];
  loading: boolean;
}

const UsersTable = memo(({ data, loading }: IProps) => {
  return (
    <Table rowKey='identificator' dataSource={data} loading={loading}>
      <Column title='Name' dataIndex='name' />
      <Column title='Identificator' dataIndex='identificator' />
      <Column title='E-mail' dataIndex='email' />
      <Column title='2FA Secret' dataIndex='otp_secret' />
      <Column
        title='Roles'
        dataIndex='roles'
        render={(val: IUser['roles']) =>
          val.map((item, index) => (
            <Tag key={index} color='processing'>
              {item}
            </Tag>
          ))
        }
      />
    </Table>
  );
});

export default UsersTable;
