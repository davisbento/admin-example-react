import { Button, Form, InputNumber, Modal } from 'antd';
import { openNotification } from 'facades/notification';
import { IDepositEventList, IUpdateEvent } from 'interfaces/deposit';
import { memo, useCallback, useState } from 'react';
import depositService from 'services/deposit';

interface IProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  event: IDepositEventList;
}
const ChangeDepositEventReturnModal = memo(({ visible, handleCancel, handleOk, event }: IProps) => {
  const [initialValues] = useState<IUpdateEvent>({ monthlyReturn: event?.monthlyReturn || null });

  const [loading, setLoading] = useState(false);

  const onFinish = useCallback(
    async (values: IUpdateEvent) => {
      setLoading(true);
      try {
        await depositService.updateDepositEvents(event.id, {
          monthlyReturn: values.monthlyReturn
        });
        openNotification('success', 'Success');
        handleOk();
        handleCancel();
      } catch (err) {
        openNotification('error', err);
      } finally {
        setLoading(false);
      }
    },
    [handleOk, event, handleCancel]
  );

  return (
    <Modal
      width={300}
      title='Alterar Retorno Fixo'
      visible={visible}
      destroyOnClose
      footer={null}
      onCancel={handleCancel}
    >
      <div>
        <Form initialValues={initialValues} onFinish={onFinish}>
          <Form.Item name='monthlyReturn' rules={[{ required: true, message: 'Obrigatório' }]}>
            <InputNumber placeholder='Monthly Return' />
          </Form.Item>

          {/* <Form.Item name='pin' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input
              placeholder='Pin'
              readOnly
              onFocus={e => {
                e.target.readOnly = false;
              }}
            />
          </Form.Item> */}

          <Form.Item>
            <Button loading={loading} type='primary' htmlType='submit' className='button-full-width'>
              Confirmar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
});

export default ChangeDepositEventReturnModal;
