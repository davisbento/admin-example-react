import { Button, Form, InputNumber, Modal, Select } from 'antd';
import { openNotification } from 'facades/notification';
import { ICreateProfitability } from 'interfaces/profitability';
import { memo, useCallback, useState } from 'react';
import consultantService from 'services/consultant';

const { Option } = Select;

interface IProps {
  visible: boolean;
  consultantId: string;
  handleOk: () => void;
  handleCancel: () => void;
}

export const CreateProfitabilityModal = memo(({ visible, handleCancel, handleOk, consultantId }: IProps) => {
  const [initialValues] = useState<ICreateProfitability>({
    value: 0,
    month: String(new Date().getMonth() + 2 === 13 ? 1 : new Date().getMonth() + 2),
    year: String(new Date().getFullYear()),
    currency: 'BTC'
  });

  const [loading, setLoading] = useState(false);

  const onFinish = useCallback(
    async (values: ICreateProfitability) => {
      setLoading(true);
      try {
        console.log(values);
        await consultantService.createProfitability(values, consultantId);
        openNotification('success', 'Success');
        setLoading(false);
        handleOk();
        handleCancel();
      } catch (err) {
        setLoading(false);
        openNotification('error', err);
      }
    },
    [handleOk, handleCancel, consultantId]
  );

  return (
    <Modal
      width={450}
      title='Nova Rentabilidade'
      visible={visible}
      destroyOnClose
      footer={null}
      onCancel={handleCancel}
    >
      <div>
        <Form initialValues={initialValues} onFinish={onFinish}>
          <Form.Item label='Percentual' name='value' rules={[{ required: true, message: 'Obrigatório' }]}>
            <InputNumber placeholder='Value' />
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

          <Form.Item label='Moeda' name='currency' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Select>
              <Option value='BTC'>BTC</Option>
              <Option value='ETH'>ETH</Option>
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
