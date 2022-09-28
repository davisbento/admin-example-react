import { Button, Form, Input, Modal } from 'antd';
import CountryPhoneInput from 'antd-country-phone-input';
import { openNotification } from 'facades/notification';
import { ICreateConsultant } from 'interfaces/consultant';
import { memo, useCallback, useState } from 'react';
import consultantService from 'services/consultant';

interface IProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
export const CreateNewConsultantModal = memo(({ visible, handleCancel, handleOk }: IProps) => {
  const [initialValues] = useState<ICreateConsultant>({
    password: '',
    name: '',
    displayName: '',
    email: '',
    phone: { phone: null, code: null },
    username: ''
  });
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = useCallback(
    async (values: ICreateConsultant) => {
      setLoading(true);
      try {
        setLoading(false);
        await consultantService.create(values);
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
    <Modal width={700} title='Criar consultor' visible={visible} destroyOnClose footer={null} onCancel={handleCancel}>
      <div>
        <Form initialValues={initialValues} onFinish={onFinish} form={form}>
          <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input placeholder='Username' />
          </Form.Item>

          <Form.Item label='Nome Inteiro' name='name' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input placeholder='Nome Inteiro' />
          </Form.Item>

          <Form.Item label='Nome Exibição' name='displayName' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input placeholder='Nome Exibição' />
          </Form.Item>

          <Form.Item
            label='E-mail'
            name='email'
            rules={[
              { required: true, message: 'Obrigatório' },
              { type: 'email', message: 'Digite um e-mail válido' }
            ]}
          >
            <Input placeholder='E-mail' />
          </Form.Item>

          <Form.Item label='Telefone' name='phone' rules={[{ required: true, message: 'Obrigatório' }]}>
            <CountryPhoneInput />
          </Form.Item>

          <Button type='default' onClick={generateRandomPassword}>
            Gerar senha aleatória
          </Button>

          <div className='mt'></div>

          <Form.Item label='Senha' name='password' rules={[{ required: true, message: 'Obrigatório' }]}>
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
