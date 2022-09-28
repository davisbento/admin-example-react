import { usePermission } from 'hooks/usePermission';
import { RoleEnum } from 'interfaces/user';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface IProps extends RouteProps {
  roles?: RoleEnum[];
}

export const PrivateRoute = ({ component: Component, roles, ...rest }: IProps) => {
  const canAccess = usePermission(roles);

  return (
    <Route
      {...rest}
      render={props => {
        if (canAccess) {
          return <Component {...props} />;
        }

        return <Redirect to={{ pathname: '/dashboard' }} />;
      }}
    />
  );
};
