import { Button, Form, Input, Modal } from 'antd';
import { openNotification } from 'facades/notification';
import { IChangeUserEmail } from 'interfaces/user';
import { memo, useCallback, useState } from 'react';
import userService from 'services/user';

interface IProps {
  visible: boolean;
  handleOk: (newEmail: string) => void;
  handleCancel: () => void;
  userIdentificator: string;
}
const ChangeEmailModal = memo(({ visible, handleCancel, handleOk, userIdentificator }: IProps) => {
  const [initialValues] = useState<IChangeUserEmail>({ userEmail: '', pin: '' });
  const [loading, setLoading] = useState(false);

  const onFinish = useCallback(
    async (values: IChangeUserEmail) => {
      setLoading(true);
      try {
        await userService.changeUserEmail({
          userEmail: values.userEmail,
          pin: values.pin,
          userIdentificator
        });
        setLoading(false);
        openNotification('success', 'Success');
        handleOk(values.userEmail);
        handleCancel();
      } catch (err) {
        setLoading(false);
        openNotification('error', err);
      }
    },
    [handleOk, userIdentificator, handleCancel]
  );

  return (
    <Modal width={700} title='Change user email' visible={visible} destroyOnClose footer={null} onCancel={handleCancel}>
      <div>
        <Form initialValues={initialValues} onFinish={onFinish}>
          <Form.Item name='userEmail' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input placeholder='New E-mail' />
          </Form.Item>

          <Form.Item name='pin' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input
              placeholder='Pin'
              readOnly
              onFocus={e => {
                e.target.readOnly = false;
              }}
            />
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

export default ChangeEmailModal;
