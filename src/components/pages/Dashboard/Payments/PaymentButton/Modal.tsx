import { Button, Form, Input, Modal, Select } from 'antd';
import Text from 'antd/lib/typography/Text';
import { openNotification } from 'facades/notification';
import { IPaymentList } from 'interfaces/payment';
import { memo, useCallback, useState } from 'react';
import paymentService from 'services/payment';

const { Option } = Select;

interface IProps {
  visible: boolean;
  payment: IPaymentList;
  handleOk: () => void;
  handleCancel: () => void;
}

export const ConfirmPaymentModal = memo(({ visible, handleCancel, handleOk, payment }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = useCallback(
    async (values: any) => {
      setLoading(true);
      try {
        await paymentService.confirmPayment(values.address, payment.id);
        openNotification('success', 'Success');
        setLoading(false);
        handleOk();
        handleCancel();
      } catch (err) {
        setLoading(false);
        openNotification('error', err);
      }
    },
    [handleOk, handleCancel, payment]
  );

  const handleChangeWallet = (value: string) => {
    form.setFieldsValue({ address: value });
  };

  return (
    <Modal
      width={550}
      title='Confirmar Pagamento'
      visible={visible}
      destroyOnClose
      footer={null}
      onCancel={handleCancel}
    >
      <div>
        <Text strong>
          Total a ser pago: {payment.currency} {payment.amount}, Cliente: {payment.clientName}
        </Text>
        <div className='mt'></div>
        <Form initialValues={{ address: '' }} onFinish={onFinish} form={form}>
          <Form.Item label='Carteiras cadastradas' name='addresses'>
            <Select onChange={handleChangeWallet}>
              {payment?.wallets?.map(item => (
                <Option key={item.address} value={item.address}>
                  {item.address}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label='Carteira escolhida' name='address' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input />
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
