import { Button } from 'antd';
import { RoleEnum } from 'interfaces/user';
import { AuthContext } from 'providers/AuthProvider';
import { memo, useContext } from 'react';

interface IProps {
  text: string;
  onClick: () => void;
  loading?: boolean;
  className?: string;
  type: 'primary' | 'default';
}

export const PermissionButton = memo(({ onClick, text, className = '', type, loading = false }: IProps) => {
  const { user } = useContext(AuthContext);

  return !user?.roles.includes(RoleEnum.CONSULTANT) ? (
    <Button className={className} type={type} onClick={onClick} loading={loading}>
      {text}
    </Button>
  ) : null;
});
