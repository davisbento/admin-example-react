import { PermissionButton } from 'components/shared/PermissionButton';
import { useModal } from 'hooks/useModal';
import { Fragment, memo } from 'react';

import CreateNewUserModal from './Modal';

interface IProps {
  onComplete: () => void;
}

const CreateNewClientButton = memo(({ onComplete }: IProps) => {
  const [visible, setVisible] = useModal();

  return (
    <Fragment>
      {visible && <CreateNewUserModal visible={visible} handleOk={onComplete} handleCancel={setVisible} />}

      <PermissionButton type='primary' onClick={setVisible} text='Criar Novo Cliente' />
    </Fragment>
  );
});

export default CreateNewClientButton;
