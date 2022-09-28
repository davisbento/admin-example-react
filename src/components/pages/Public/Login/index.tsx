import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input } from 'antd';
import Title from 'antd/lib/typography/Title';
import { saveToken } from 'facades/localStorage';
import { ILogin } from 'interfaces/auth';
import { memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from 'services/auth';

const Login = memo(() => {
  const history = useHistory();
  const [model] = useState<ILogin>({ username: '', password: '', otpCode: '' });
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ILogin) => {
    setError(undefined);
    setLoading(true);
    try {
      const response = await authService.login(values);

      saveToken(response.token);
      setLoading(false);
      history.push('/dashboard');
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return (
    <div className='center-form'>
      <div className='logo-container'>
        <img className='logo-public' src='/logosite.png' alt='Logo' />
      </div>

      <div className='auth-card'>
        <Title className='align-text' style={{ fontWeight: 200 }}>
          Login
        </Title>
        {error && <Alert message={error} type='error' showIcon />}

        <div className='mt' />

        <Form initialValues={model} onFinish={onFinish}>
          <Form.Item name='username' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input
              prefix={<UserOutlined className='site-form-item-icon' style={{ marginRight: '10px' }} />}
              placeholder='Username'
            />
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' style={{ marginRight: '10px' }} />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          {/* <Form.Item name='otpCode'>
            <Input
              prefix={<MobileOutlined className='site-form-item-icon' style={{ marginRight: '10px' }} />}
              type='number'
              placeholder='2FA Token'
            />
          </Form.Item> */}

          <Form.Item style={{ marginBottom: '10px' }}>
            <Button loading={loading} type='primary' htmlType='submit' className='button-full-width'>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});

export default Login;
