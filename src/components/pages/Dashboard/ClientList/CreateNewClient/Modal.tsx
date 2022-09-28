import { Button, Form, Input, Modal } from 'antd';
import CountryPhoneInput from 'antd-country-phone-input';
import { openNotification } from 'facades/notification';
import { IClientCreate } from 'interfaces/client';
import { memo, useCallback, useState } from 'react';
import clientService from 'services/client';

interface IProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
const CreteNewClientModal = memo(({ visible, handleCancel, handleOk }: IProps) => {
  const [initialValues] = useState<IClientCreate>({
    password: '',
    name: '',
    phone: { phone: null, code: null },
    username: ''
  });
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = useCallback(
    async (values: IClientCreate) => {
      setLoading(true);
      try {
        setLoading(false);
        await clientService.create(values);
        openNotification('success', 'Success');
        handleOk();
        handleCancel();
      } catch (err) {
        setLoading(false);
        openNotification('error', err);
      }
    },
    [handleOk, handleCancel]
  );

  const generateRandomPassword = useCallback(() => {
    const password = Math.random().toString(36).slice(-8);
    form.setFieldsValue({ password });
  }, [form]);

  return (
    <Modal width={700} title='Create new user' visible={visible} destroyOnClose footer={null} onCancel={handleCancel}>
      <div>
        <Form initialValues={initialValues} onFinish={onFinish} form={form}>
          <Form.Item name='username' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input placeholder='Username' />
          </Form.Item>

          <Form.Item name='name' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input placeholder='Name' />
          </Form.Item>

          <Form.Item name='phone' rules={[{ required: true, message: 'Obrigatório' }]}>
            <CountryPhoneInput />
          </Form.Item>

          <Button type='default' onClick={generateRandomPassword}>
            Generate Password
          </Button>

          <div className='mt'></div>

          <Form.Item name='password' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input placeholder='Password' />
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

export default CreteNewClientModal;
