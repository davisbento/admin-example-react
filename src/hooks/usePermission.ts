import { RoleEnum } from 'interfaces/user';
import { AuthContext } from 'providers/AuthProvider';
import { useContext, useMemo } from 'react';

export function usePermission(roles?: RoleEnum[]) {
  const { user } = useContext(AuthContext);

  const hasRoles = useMemo(() => {
    if (!roles) {
      return true;
    }

    if (user.roles.includes(RoleEnum.ADMIN_FULL)) {
      return true;
    }

    return roles.some(role => user.roles.includes(role));
  }, [roles, user]);

  const canAccess = useMemo(() => {
    if (hasRoles) {
      return true;
    }

    return false;
  }, [hasRoles]);

  return canAccess;
}
