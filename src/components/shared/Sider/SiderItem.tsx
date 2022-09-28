import { Menu } from 'antd';
import { usePermission } from 'hooks/usePermission';
import { Fragment, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { IMenu } from '.';

const { Item } = Menu;

interface IProps extends IMenu {}

const SiderItem = memo(({ to, name, icon, roles = null, ...rest }: IProps) => {
  const canAccess = usePermission(roles);

  const renderSiderItem = useMemo(() => {
    if (!canAccess) {
      return null;
    }

    return (
      <Item {...rest}>
        <Link to={to}>
          {icon} <span>{name}</span>
        </Link>
      </Item>
    );
  }, [to, name, icon, canAccess, rest]);

  return <Fragment>{renderSiderItem}</Fragment>;
});

export default SiderItem;
