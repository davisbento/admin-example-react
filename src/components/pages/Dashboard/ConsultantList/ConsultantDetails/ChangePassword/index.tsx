import { PermissionButton } from 'components/shared/PermissionButton';
import { useModal } from 'hooks/useModal';
import { Fragment, memo } from 'react';

import { ChangeConsultantPasswordModal } from './Modal';

interface IProps {
  consultantId: string;
}

export const ChangeConsultantPasswordButton = memo(({ consultantId }: IProps) => {
  const [visible, setVisible] = useModal();

  return (
    <Fragment>
      {visible && (
        <ChangeConsultantPasswordModal visible={visible} consultantId={consultantId} handleCancel={setVisible} />
      )}

      <PermissionButton type='primary' onClick={setVisible} text='Alterar Senha' />
    </Fragment>
  );
});
