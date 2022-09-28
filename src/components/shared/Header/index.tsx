import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Menu, Typography } from 'antd';
import { AuthContext } from 'providers/AuthProvider';
import { memo, useCallback, useContext, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

const { Text } = Typography;

const { Header } = Layout;

const HeaderDefault = memo(() => {
  const { user, logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = useCallback(() => {
    logout();
    history.push('/login');
  }, [logout, history]);

  const menu = useMemo(
    () => (
      <Menu>
        <Menu.Item key='1' onClick={handleLogout}>
          <LogoutOutlined />
          Logout
        </Menu.Item>
      </Menu>
    ),
    [handleLogout]
  );

  return (
    <Header className='header'>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ color: '#fff' }}>{user?.username || ''}</Text>

        <Dropdown.Button overlay={menu} icon={<UserOutlined />} />
      </div>
    </Header>
  );
});

export default HeaderDefault;
