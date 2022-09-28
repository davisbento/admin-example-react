import { PermissionButton } from 'components/shared/PermissionButton';
import { useModal } from 'hooks/useModal';
import { IDepositList } from 'interfaces/deposit';
import { Fragment, memo } from 'react';

import { ChangeDepositReturnModal } from './Modal';

interface IProps {
  deposit: IDepositList;
  onComplete: () => void;
}

export const ChangeDepositReturnButton = memo(({ deposit, onComplete }: IProps) => {
  const [visible, setVisible] = useModal();

  return (
    <Fragment>
      {visible && (
        <ChangeDepositReturnModal visible={visible} deposit={deposit} handleOk={onComplete} handleCancel={setVisible} />
      )}

      <PermissionButton type='primary' onClick={setVisible} text=' Alterar Retorno Fixo' />
    </Fragment>
  );
});
