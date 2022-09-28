import { Button } from 'antd';
import { useModal } from 'hooks/useModal';
import { IDepositList } from 'interfaces/deposit';
import { Fragment, memo } from 'react';

import { GeneratePaymentModal } from './Modal';

interface IProps {
  deposit: IDepositList;
  onComplete: () => void;
}

export const GeneratePaymentButton = memo(({ deposit, onComplete }: IProps) => {
  const [visible, setVisible] = useModal();

  return (
    <Fragment>
      {visible && (
        <GeneratePaymentModal visible={visible} deposit={deposit} handleOk={onComplete} handleCancel={setVisible} />
      )}

      <Button type='primary' onClick={setVisible}>
        Retirada
      </Button>
    </Fragment>
  );
});
