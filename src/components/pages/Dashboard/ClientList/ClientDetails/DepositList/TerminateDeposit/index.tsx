import { Button } from 'antd';
import { useModal } from 'hooks/useModal';
import { Fragment, memo } from 'react';

import { TerminateDepositModal } from './Modal';

interface IProps {
  depositId: string;
  onComplete: () => void;
}

export const CancelDepositButton = memo(({ depositId, onComplete }: IProps) => {
  const [visible, setVisible] = useModal();

  return (
    <Fragment>
      {visible && (
        <TerminateDepositModal
          visible={visible}
          depositId={depositId}
          handleOk={onComplete}
          handleCancel={setVisible}
        />
      )}

      <Button className='button-danger' onClick={setVisible}>
        Encerrar
      </Button>
    </Fragment>
  );
});
