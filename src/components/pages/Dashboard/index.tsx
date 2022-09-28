import { Layout } from 'antd';
import HeaderDefault from 'components/shared/Header';
import { PrivateRoute } from 'components/shared/PrivateRoute';
import ScreenLoader from 'components/shared/ScreenLoader';
import SiderDefault from 'components/shared/Sider';
import { getToken } from 'facades/localStorage';
import { RoleEnum } from 'interfaces/user';
import { AuthContext } from 'providers/AuthProvider';
import { Fragment, memo, useCallback, useContext, useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import userService from 'services/user';

import AdminUsers from './AdminUsers';
import ClientList from './ClientList';
import ConsultantList from './ConsultantList';
import EventsCloseToExecute from './EventsCloseToExecute';
import Home from './Home';
import Payments from './Payments';
import PaymentsHistory from './PaymentsHistory';
import ProfitabilityList from './ProfitabilityList';

const { Content } = Layout;

const Dashboard = memo(() => {
  const history = useHistory();
  const { setUser, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const getUser = useCallback(async () => {
    setLoading(true);
    try {
      const user = await userService.getProfile();
      setUser(user);
      setLoading(false);
    } catch (err) {
      logout();
      history.push('/login');
    }
  }, [setUser, history, logout]);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      history.push('/login');
      return;
    }

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {loading ? (
        <ScreenLoader />
      ) : (
        <Layout>
          <SiderDefault />
          <Layout>
            <HeaderDefault />
            <Content>
              <Switch>
                <Route exact path='/dashboard' component={Home} />
                <PrivateRoute exact path='/dashboard/users/admin' component={AdminUsers} />
                <PrivateRoute exact path='/dashboard/clients' component={ClientList} />
                <PrivateRoute
                  roles={[RoleEnum.ADMIN_FULL]}
                  exact
                  path='/dashboard/consultants'
                  component={ConsultantList}
                />
                <PrivateRoute exact path='/dashboard/profitability' component={ProfitabilityList} />
                <PrivateRoute exact path='/dashboard/payments' component={Payments} />
                <PrivateRoute exact path='/dashboard/payments-history' component={PaymentsHistory} />
                <PrivateRoute exact path='/dashboard/events-to-execute' component={EventsCloseToExecute} />
                <Redirect to='/dashboard' />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      )}
    </Fragment>
  );
});

export default Dashboard;
