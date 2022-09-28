import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd';
import addMonths from 'date-fns/addMonths';
import { openNotification } from 'facades/notification';
import { EnCurrency } from 'interfaces/currency';
import { ICreateDeposit } from 'interfaces/deposit';
import moment from 'moment';
import { memo, useCallback, useState } from 'react';
import depositService from 'services/deposit';

const { Option } = Select;

interface IProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  clientId: string;
}

export const CreateNewDepositModal = memo(({ visible, handleCancel, handleOk, clientId }: IProps) => {
  const [form] = Form.useForm();

  const [initialValues] = useState<Partial<ICreateDeposit>>({
    startAt: moment(new Date().toISOString(), 'YYYY-MM-DD'),
    endAt: moment(addMonths(new Date(), 12).toISOString(), 'YYYY-MM-DD'),
    amount: 0,
    currency: EnCurrency.BTC,
    txId: ''
  });

  const [loading, setLoading] = useState(false);

  const onFinish = useCallback(
    async (values: ICreateDeposit) => {
      setLoading(true);
      try {
        await depositService.createDeposit({ ...values, clientId });
        openNotification('success', 'Sucesso');
        setLoading(false);
        handleCancel();
        handleOk();
      } catch (err) {
        setLoading(false);
        openNotification('error', err);
      }
    },
    [handleOk, handleCancel, clientId]
  );

  function onChangeDate(date: moment.Moment) {
    form.setFieldsValue({
      startAt: date,
      endAt: date.clone().add(12, 'months')
    });
  }

  return (
    <Modal
      width={700}
      title='Criar novo contrato'
      visible={visible}
      destroyOnClose
      footer={null}
      onCancel={handleCancel}
    >
      <div>
        <Form initialValues={initialValues} onFinish={onFinish} form={form}>
          <Form.Item label='Quantidade' name='amount' rules={[{ required: true, message: 'Obrigatório' }]}>
            <InputNumber placeholder='Quantidade' />
          </Form.Item>

          <Form.Item label='Moeda' name='currency' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Select>
              <Option value='BTC'>BTC</Option>
              <Option value='ETH'>ETH</Option>
            </Select>
          </Form.Item>

          <Form.Item label='Inicio' name='startAt' rules={[{ required: true, message: 'Obrigatório' }]}>
            <DatePicker onChange={onChangeDate} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label='Fim' name='endAt' rules={[{ required: true, message: 'Obrigatório' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label='Tx Hash' name='txId' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input placeholder='Tx Hash' />
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
