import { getToken } from 'facades/localStorage';
import { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import Login from './Login';

const PublicPages = () => {
  const history = useHistory();

  useEffect(() => {
    const token = getToken();
    if (token) history.push('/dashboard');
  }, [history]);

  return (
    <Switch>
      <Route path='/login' component={Login} />
      <Redirect to='/login' />
    </Switch>
  );
};

export default PublicPages;
