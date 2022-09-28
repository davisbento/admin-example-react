import { PermissionButton } from 'components/shared/PermissionButton';
import { useModal } from 'hooks/useModal';
import { IDepositList } from 'interfaces/deposit';
import { Fragment, memo } from 'react';

import { CreatePartialBalanceModal } from './Modal';

interface IProps {
  deposit: IDepositList;
  clientId: string;
  onComplete: () => void;
}

export const CreatePartialBalanceButton = memo(({ deposit, onComplete, clientId }: IProps) => {
  const [visible, setVisible] = useModal();

  return (
    <Fragment>
      {visible && (
        <CreatePartialBalanceModal
          visible={visible}
          deposit={deposit}
          clientId={clientId}
          handleOk={onComplete}
          handleCancel={setVisible}
        />
      )}
      <PermissionButton type='primary' onClick={setVisible} text='Adicionar saldo ao contrato' />
    </Fragment>
  );
});
