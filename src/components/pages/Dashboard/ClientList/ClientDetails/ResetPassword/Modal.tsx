import { Alert, Button, Modal } from 'antd';
import { InputCopy } from 'components/shared/InputCopy';
import { openNotification } from 'facades/notification';
import { memo, useCallback, useEffect, useState } from 'react';
import clientService from 'services/client';

interface IProps {
  visible: boolean;
  handleCancel: () => void;
  clientId: string;
}
export const ResetPasswordModal = memo(({ visible, handleCancel, clientId }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const onFinish = useCallback(async () => {
    setLoading(true);
    setSuccess(false);
    try {
      const response = await clientService.resetPassword(clientId);
      setLoading(false);
      openNotification('success', 'Success');
      setSuccess(true);
      setNewPassword(response.newPassword);
    } catch (err) {
      setLoading(false);
      openNotification('error', err);
    }
  }, [clientId]);

  useEffect(() => {
    if (!visible) {
      setSuccess(false);
      setNewPassword('');
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      width={700}
      title='Resetar senha do cliente'
      visible={visible}
      destroyOnClose
      footer={null}
      onCancel={handleCancel}
    >
      <div>
        {success && (
          <div>
            <Alert message='Senha resetada com sucesso, envie essa senha para o cliente' type='success' showIcon />

            <div className='mt'></div>

            <InputCopy value={newPassword} />
            <div className='mt'></div>
          </div>
        )}

        <Button loading={loading} type='primary' onClick={onFinish} className='button-full-width'>
          Confirmar
        </Button>
      </div>
    </Modal>
  );
});
