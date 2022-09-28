import { Button } from 'antd';
import { useModal } from 'hooks/useModal';
import { Fragment, memo } from 'react';

import LoginAsModal from './Modal';

interface IProps {
  userIdentificator: string;
}

const LoginAsSupportButton = memo(({ userIdentificator }: IProps) => {
  const [visible, setVisible] = useModal();

  return (
    <Fragment>
      {visible && <LoginAsModal visible={visible} userIdentificator={userIdentificator} handleCancel={setVisible} />}

      <Button type='primary' onClick={setVisible}>
        Login As Support
      </Button>
    </Fragment>
  );
});

export default LoginAsSupportButton;
