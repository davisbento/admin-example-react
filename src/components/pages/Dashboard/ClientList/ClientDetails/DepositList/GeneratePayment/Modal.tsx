import { Button, Form, InputNumber, Modal, Select } from 'antd';
import Text from 'antd/lib/typography/Text';
import { formatCurrency } from 'facades/money';
import { openNotification } from 'facades/notification';
import { IDepositList, IGeneratePayment } from 'interfaces/deposit';
import { chain } from 'mathjs';
import { memo, useCallback, useMemo, useState } from 'react';
import depositService from 'services/deposit';

const { Option } = Select;

interface IProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  deposit: IDepositList;
}

export const GeneratePaymentModal = memo(({ visible, handleCancel, handleOk, deposit }: IProps) => {
  const [form] = Form.useForm();

  const [initialValues] = useState<IGeneratePayment>({
    amount: 0,
    percent: 0,
    month: String(new Date().getMonth() + 2),
    year: String(new Date().getFullYear())
  });

  const total = useMemo(() => deposit?.total || 0, [deposit]);

  const [loading, setLoading] = useState(false);

  const onFinish = useCallback(
    async (values: IGeneratePayment) => {
      setLoading(true);
      try {
        await depositService.generatePayment(values, deposit.id);
        openNotification('success', 'Sucesso');
        setLoading(false);
        handleCancel();
        handleOk();
      } catch (err) {
        setLoading(false);
        openNotification('error', err);
      }
    },
    [handleOk, handleCancel, deposit]
  );

  const handleChangePercent = (value: number) => {
    if (value > 100) {
      return;
    }

    form.setFieldsValue({
      amount: chain((value * total) / 100)
        .round(8)
        .done()
    });
  };

  return (
    <Modal width={700} title='Gerar pagamento' visible={visible} destroyOnClose footer={null} onCancel={handleCancel}>
      <div>
        <Form initialValues={initialValues} onFinish={onFinish} form={form}>
          <Text strong>
            Valor disponível: {deposit.currency} {formatCurrency(total, 8)}{' '}
          </Text>

          <div className='mt'></div>

          <Form.Item label='Porcentagem' name='percent' rules={[{ required: true, message: 'Obrigatório' }]}>
            <InputNumber
              defaultValue={100}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              placeholder='Porcentagem'
              onChange={(value: any) => handleChangePercent(value)}
            />
          </Form.Item>

          <Form.Item label='Quantidade' name='amount' rules={[{ required: true, message: 'Obrigatório' }]}>
            <InputNumber placeholder='Quantidade' />
          </Form.Item>

          <Form.Item label='Mês' name='month' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Select>
              <Option value='1'>Janeiro</Option>
              <Option value='2'>Fevereiro</Option>
              <Option value='3'>Março</Option>
              <Option value='4'>Abril</Option>
              <Option value='5'>Maio</Option>
              <Option value='6'>Junho</Option>
              <Option value='7'>Julho</Option>
              <Option value='8'>Agosto</Option>
              <Option value='9'>Setembro</Option>
              <Option value='10'>Outubro</Option>
              <Option value='11'>Novembro</Option>
              <Option value='12'>Dezembro</Option>
            </Select>
          </Form.Item>

          <Form.Item label='Ano' name='year' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Select>
              <Option value='2021'>2021</Option>
              <Option value='2022'>2022</Option>
            </Select>
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
