import { Typography } from 'antd';
import { PermissionButton } from 'components/shared/PermissionButton';
import useFetch from 'hooks/useFetch';
import { useModal } from 'hooks/useModal';
import { Fragment, memo, useCallback } from 'react';
import userService from 'services/user';

import UserModal from './Modal';
import UsersTable from './Table';

const { Title } = Typography;

const Users = memo(() => {
  const { data, loading, fetchData } = useFetch(() => userService.getAllAdminUsers(), []);
  const [visible, setVisible] = useModal();

  const handleOk = useCallback(() => {
    fetchData();
    setVisible();
  }, [fetchData, setVisible]);

  return (
    <Fragment>
      <div className='header-container'>
        <Title level={3}>Users</Title>
      </div>
      <div className='content-container'>
        {visible && <UserModal visible={visible} handleOk={handleOk} handleCancel={setVisible} />}

        <PermissionButton type='primary' onClick={setVisible} text='Criar Usuário' />

        <div className='mt' />

        <UsersTable data={data} loading={loading} />
      </div>
    </Fragment>
  );
});

export default Users;
