import { Button, Form, Input, Modal } from 'antd';
import { openNotification } from 'facades/notification';
import { ILoginAsSupport } from 'interfaces/auth';
import { memo, useState } from 'react';
import authService from 'services/auth';

interface IProps {
  visible: boolean;
  handleCancel: () => void;
  userIdentificator: string;
}
const LoginAsModal = memo(({ visible, handleCancel, userIdentificator }: IProps) => {
  const [initialValues] = useState<ILoginAsSupport>({
    pin: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ILoginAsSupport) => {
    setLoading(true);
    try {
      await authService.loginAsSupport({ ...values, userIdentificator });
      setLoading(false);
      //TODO CHANGE THIS
      // window.open(`https://dash.criptoacademy.com.br/login-as?token=${response.token}`, '_blank');
      handleCancel();
    } catch (err) {
      openNotification('error', err);
      setLoading(false);
    }
  };

  return (
    <Modal width={700} title='Login as support' visible={visible} destroyOnClose footer={null} onCancel={handleCancel}>
      <div>
        <Form initialValues={initialValues} onFinish={onFinish}>
          <Form.Item name='pin' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input
              readOnly
              onFocus={e => {
                e.target.readOnly = false;
              }}
              placeholder='PIN'
            />
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input.Password type='password' placeholder='Password' />
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

export default LoginAsModal;
