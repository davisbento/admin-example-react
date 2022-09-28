import { Button, Form, Input, Modal } from 'antd';
import { openNotification } from 'facades/notification';
import { memo, useCallback, useState } from 'react';
import consultantService from 'services/consultant';

interface IProps {
  visible: boolean;
  handleCancel: () => void;
  consultantId: string;
}
export const ChangeConsultantPasswordModal = memo(({ visible, handleCancel, consultantId }: IProps) => {
  const [initialValues] = useState({ password: '' });
  const [loading, setLoading] = useState(false);

  const onFinish = useCallback(
    async (values: any) => {
      setLoading(true);
      try {
        await consultantService.changeConsultantPassword(values.password, consultantId);
        setLoading(false);
        openNotification('success', 'Sucesso');
        handleCancel();
      } catch (err) {
        setLoading(false);
        openNotification('error', err);
      }
    },
    [consultantId, handleCancel]
  );

  return (
    <Modal width={500} title='Alterar Senha' visible={visible} destroyOnClose footer={null} onCancel={handleCancel}>
      <div>
        <Form initialValues={initialValues} onFinish={onFinish}>
          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Obrigatório' },
              { min: 8, message: 'Minimo 8 caracteres' }
            ]}
          >
            <Input placeholder='Nova Senha' />
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
