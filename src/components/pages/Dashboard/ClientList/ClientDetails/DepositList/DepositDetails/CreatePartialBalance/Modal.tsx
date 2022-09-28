import { Button, Form, InputNumber, Modal } from 'antd';
import { openNotification } from 'facades/notification';
import { IDepositList } from 'interfaces/deposit';
import { memo, useCallback, useState } from 'react';
import balanceService from 'services/balance';

interface IProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  deposit: IDepositList;
  clientId: string;
}
export const CreatePartialBalanceModal = memo(({ visible, handleCancel, handleOk, deposit, clientId }: IProps) => {
  const [loading, setLoading] = useState(false);

  const onFinish = useCallback(
    async (values: { amount: number }) => {
      setLoading(true);
      try {
        await balanceService.createPartialDeposit(values.amount, clientId, deposit.id, deposit.currency);
        openNotification('success', 'Success');
        handleOk();
        handleCancel();
      } catch (err) {
        openNotification('error', err);
      } finally {
        setLoading(false);
      }
    },
    [handleOk, deposit, handleCancel, clientId]
  );

  return (
    <Modal
      width={300}
      title='Adicionar saldo ao contrato'
      visible={visible}
      destroyOnClose
      footer={null}
      onCancel={handleCancel}
    >
      <div>
        <Form initialValues={{ amount: 0 }} onFinish={onFinish}>
          <Form.Item name='amount' rules={[{ required: true, message: 'Obrigatório' }]}>
            <InputNumber placeholder='Amount' />
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
