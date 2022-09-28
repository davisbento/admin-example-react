import {
  BankOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  HistoryOutlined,
  LineChartOutlined,
  UserAddOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { Layout, Menu, Tag } from 'antd';
import { RoleEnum } from 'interfaces/user';
import { Fragment, memo, useCallback, useMemo, useState } from 'react';

import SiderItem from './SiderItem';

const { Sider } = Layout;

export interface IMenu {
  to: string;
  name: string;
  icon: JSX.Element;
  sub?: IMenu[];
  roles?: RoleEnum[];
}

const SiderDefault = memo(() => {
  const [collapse, setCollapse] = useState(false);

  const handleCollpase = useCallback(() => setCollapse(!collapse), [collapse]);

  const renderSider = useMemo(() => {
    return (
      <Sider className='sider' width={200} collapsed={collapse} collapsible onCollapse={handleCollpase}>
        <div className='flex-center' style={{ height: 63 }}>
          <Tag color='#4388F8'>Admin Painel</Tag>
        </div>

        <Menu className='sider'>
          <SiderItem name='Dashboard' to='/dashboard' icon={<LineChartOutlined />} key='1' />
          <SiderItem name='Clientes' to='/dashboard/clients' icon={<UsergroupAddOutlined />} key='2' />
          <SiderItem
            name='Consultores'
            roles={[RoleEnum.ADMIN_FULL]}
            to='/dashboard/consultants'
            icon={<UserAddOutlined />}
            key='22'
          />
          <SiderItem name='Rentabilidades' to='/dashboard/profitability' icon={<BankOutlined />} key='3' />
          <SiderItem name='Próximos Venci.' to='/dashboard/events-to-execute' icon={<ClockCircleOutlined />} key='4' />
          <SiderItem name='Pagamentos' to='/dashboard/payments' icon={<DollarCircleOutlined />} key='5' />
          <SiderItem
            name='Histórico de Pagamentos'
            to='/dashboard/payments-history'
            icon={<HistoryOutlined />}
            key='6'
          />
        </Menu>
      </Sider>
    );
  }, [collapse, handleCollpase]);
  return <Fragment>{renderSider}</Fragment>;
});

export default SiderDefault;
