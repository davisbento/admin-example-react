import { Alert, Button, Form, Input, InputNumber } from 'antd';
import { openNotification } from 'facades/notification';
import { IAddress } from 'interfaces/client';
import { Fragment, memo, useState } from 'react';
import clientService from 'services/client';

interface IProps {
  data: IAddress;
  clientId: string;
}

export const AddressesForm = memo(({ data, clientId }: IProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const [initialValues] = useState<IAddress>(() => ({
    street: data?.street || '',
    city: data?.city || '',
    country: data?.country || '',
    postalCode: data?.postalCode || null,
    state: data?.state || '',
    number: data?.number || null
  }));

  const onChange = () => {
    setIsDirty(true);
  };

  const onFinish = async (values: IAddress) => {
    try {
      setLoading(true);
      await clientService.changeAddress(clientId, values);
      setIsDirty(false);
      openNotification('success', 'Sucesso');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {isDirty && (
        <div>
          <Alert message='Existem alterações que não foram salvas' type='info' showIcon />
          <div className='mt'></div>
        </div>
      )}

      <Form initialValues={initialValues} form={form} onChange={onChange} onFinish={onFinish}>
        <Form.Item name='country' rules={[{ required: true, message: 'Obrigatório' }]}>
          <Input placeholder='País' />
        </Form.Item>

        <Form.Item name='street' rules={[{ required: true, message: 'Obrigatório' }]}>
          <Input placeholder='Rua' />
        </Form.Item>

        <Form.Item name='city' rules={[{ required: true, message: 'Obrigatório' }]}>
          <Input placeholder='Cidade' />
        </Form.Item>

        <Form.Item name='number' rules={[{ required: true, message: 'Obrigatório' }]}>
          <InputNumber placeholder='Numero' />
        </Form.Item>

        <Form.Item name='state'>
          <Input placeholder='Bairro' />
        </Form.Item>

        <Form.Item name='postalCode'>
          <InputNumber placeholder='CEP' />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type='primary' htmlType='submit' className='button-full-width'>
            Confirmar Alterações
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
});
