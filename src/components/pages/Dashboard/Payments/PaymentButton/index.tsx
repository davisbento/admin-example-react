import { PermissionButton } from 'components/shared/PermissionButton';
import { useModal } from 'hooks/useModal';
import { IPaymentList } from 'interfaces/payment';
import { Fragment, memo } from 'react';

import { ConfirmPaymentModal } from './Modal';

interface IProps {
  payment: IPaymentList;
  onComplete: () => void;
}

export const ConfirmPaymentButton = memo(({ payment, onComplete }: IProps) => {
  const [visible, setVisible] = useModal();

  return (
    <Fragment>
      {visible && (
        <ConfirmPaymentModal visible={visible} payment={payment} handleOk={onComplete} handleCancel={setVisible} />
      )}

      <PermissionButton type='primary' onClick={setVisible} text='Pagar' />
    </Fragment>
  );
});
