import { Alert, Button, Modal } from 'antd';
import { openNotification } from 'facades/notification';
import { memo, useCallback, useState } from 'react';
import depositService from 'services/deposit';

interface IProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  depositId: string;
}
export const TerminateDepositModal = memo(({ visible, handleCancel, handleOk, depositId }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = useCallback(async () => {
    setLoading(true);
    try {
      await depositService.terminateDeposit(depositId);
      openNotification('success', 'Sucesso');
      setLoading(false);
      handleOk();
      handleCancel();
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, [handleOk, depositId, handleCancel]);

  return (
    <Modal width={400} title='Encerrar contrato' visible={visible} destroyOnClose footer={null} onCancel={handleCancel}>
      <div>{loading && <div>Carregando...</div>}</div>

      {error && <Alert message='Error' description={error} showIcon type='error' />}

      <div className='mt' />

      <Button type='primary' onClick={onFinish} loading={loading} className='button-full-width'>
        Confirmar
      </Button>
    </Modal>
  );
});
