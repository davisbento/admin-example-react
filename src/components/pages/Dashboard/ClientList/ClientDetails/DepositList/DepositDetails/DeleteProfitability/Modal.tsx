import { Alert, Button, Modal } from 'antd';
import { openNotification } from 'facades/notification';
import { IDepositEventList } from 'interfaces/deposit';
import { memo, useCallback, useState } from 'react';
import balanceService from 'services/balance';

interface IProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  event: IDepositEventList;
}
export const DeleteBalanceModal = memo(({ visible, handleCancel, handleOk, event }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = useCallback(async () => {
    setLoading(true);
    try {
      await balanceService.deleteBalanceByEventId(event.id);
      openNotification('success', 'Success');
      setLoading(false);
      handleOk();
      handleCancel();
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, [handleOk, event, handleCancel]);

  return (
    <Modal
      width={400}
      title='Confirmar exclusão da rentabilidade'
      visible={visible}
      destroyOnClose
      footer={null}
      onCancel={handleCancel}
    >
      <div>{loading && <div>Carregando...</div>}</div>

      {error && <Alert message='Error' description={error} showIcon type='error' />}

      <div className='mt' />

      <Button type='primary' onClick={onFinish} loading={loading}>
        Confirmar
      </Button>
    </Modal>
  );
});
