import { Button, Form, InputNumber, Modal } from 'antd';
import { openNotification } from 'facades/notification';
import { IDepositList, IUpdateEvent } from 'interfaces/deposit';
import { memo, useCallback, useState } from 'react';
import depositService from 'services/deposit';

interface IProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  deposit: IDepositList;
}

export const ChangeDepositReturnModal = memo(({ visible, handleCancel, handleOk, deposit }: IProps) => {
  const [initialValues] = useState<IUpdateEvent>({ monthlyReturn: deposit?.monthlyReturn || null });

  const [loading, setLoading] = useState(false);

  const onFinish = useCallback(
    async (values: IUpdateEvent) => {
      setLoading(true);
      try {
        await depositService.updateDeposit(deposit.id, {
          monthlyReturn: values.monthlyReturn
        });
        openNotification('success', 'Success');
        setLoading(false);
        handleCancel();
        handleOk();
      } catch (err) {
        setLoading(false);
        openNotification('error', err);
      }
    },
    [handleOk, deposit, handleCancel]
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
