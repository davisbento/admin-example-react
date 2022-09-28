import { Alert, Button, Modal } from 'antd';
import { openNotification } from 'facades/notification';
import { IProcessEventList } from 'interfaces/deposit';
import { memo, useCallback, useState } from 'react';
import depositService from 'services/deposit';

interface IProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  event: IProcessEventList;
}
const ProcessDepositEventModal = memo(({ visible, handleCancel, handleOk, event }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await depositService.processDepositEvents({
        eventId: event.id
      });
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
    <Modal width={400} title='Processar Evento' visible={visible} destroyOnClose footer={null} onCancel={handleCancel}>
      <div className='flex-center'>
        <div>{loading && <div>Carregando...</div>}</div>

        {error && <Alert message='Error' description={error} showIcon type='error' />}

        <div className='mt' />

        <Button type='primary' onClick={onFinish} loading={loading}>
          Processar
        </Button>
      </div>
    </Modal>
  );
});

export default ProcessDepositEventModal;
