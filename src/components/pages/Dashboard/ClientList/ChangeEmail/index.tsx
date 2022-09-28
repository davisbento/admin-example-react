import { PermissionButton } from 'components/shared/PermissionButton';
import { useModal } from 'hooks/useModal';
import { Fragment, memo } from 'react';

import ChangeEmailModal from './Modal';

interface IProps {
  userIdentificator: string;
  onComplete: (email: string) => void;
}

const ChangeUserEmailButton = memo(({ userIdentificator, onComplete }: IProps) => {
  const [visible, setVisible] = useModal();

  return (
    <Fragment>
      {visible && (
        <ChangeEmailModal
          visible={visible}
          userIdentificator={userIdentificator}
          handleOk={onComplete}
          handleCancel={setVisible}
        />
      )}

      <PermissionButton type='primary' onClick={setVisible} text='Change User E-mail' />
    </Fragment>
  );
});

export default ChangeUserEmailButton;
