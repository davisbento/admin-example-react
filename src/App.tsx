import 'antd-country-phone-input/dist/index.css';
import 'antd/dist/antd.css';
import 'assets/css/global.scss';

import { ConfigProvider } from 'antd-country-phone-input';
import Dashboard from 'components/pages/Dashboard';
import PublicPages from 'components/pages/Public';
import { AuthProvider } from 'providers/AuthProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import en from 'world_countries_lists/data/en/world.json';

export default () => (
  <AuthProvider>
    <RecoilRoot>
      <ConfigProvider locale={en}>
        <Router>
          <Switch>
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/' component={PublicPages} />
          </Switch>
        </Router>
      </ConfigProvider>
    </RecoilRoot>
  </AuthProvider>
);
