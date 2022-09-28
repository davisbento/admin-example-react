import { PermissionButton } from 'components/shared/PermissionButton';
import { useModal } from 'hooks/useModal';
import { Fragment, memo } from 'react';

import { CreateNewDepositModal } from './Modal';

interface IProps {
  clientId: string;
  onComplete: () => void;
}

export const CreateNewDeposit = memo(({ clientId, onComplete }: IProps) => {
  const [visible, setVisible] = useModal();

  return (
    <Fragment>
      {visible && (
        <CreateNewDepositModal visible={visible} clientId={clientId} handleOk={onComplete} handleCancel={setVisible} />
      )}

      <PermissionButton type='primary' onClick={setVisible} text='Criar Novo Contrato' />
    </Fragment>
  );
});
