import { Button } from 'antd';
import { Fragment, memo, useState } from 'react';

import { ResetPasswordModal } from './Modal';

interface IProps {
  clientId: string;
}

export const ResetPasswordButton = memo(({ clientId }: IProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <Fragment>
      <ResetPasswordModal clientId={clientId} handleCancel={() => setVisible(false)} visible={visible} />

      <Button type='primary' onClick={() => setVisible(true)}>
        Resetar Senha do Cliente
      </Button>
    </Fragment>
  );
});
