import { Button, Form, InputNumber, Modal } from 'antd';
import { openNotification } from 'facades/notification';
import { IUpdateEvent } from 'interfaces/deposit';
import { IProfitability } from 'interfaces/profitability';
import { memo, useCallback, useState } from 'react';
import consultantService from 'services/consultant';

interface IProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  profit: IProfitability;
}

export const ChangeProfitabilityReturnModal = memo(({ visible, handleCancel, handleOk, profit }: IProps) => {
  const [initialValues] = useState<{ monthlyReturn: number }>({ monthlyReturn: profit?.value || null });

  const [loading, setLoading] = useState(false);

  const onFinish = useCallback(
    async (values: IUpdateEvent) => {
      setLoading(true);
      try {
        await consultantService.updateProfitability(values.monthlyReturn, profit.id);
        openNotification('success', 'Success');
        setLoading(false);
        handleOk();
        handleCancel();
      } catch (err) {
        setLoading(false);
        openNotification('error', err);
      }
    },
    [handleOk, profit, handleCancel]
  );

  return (
    <Modal
      width={300}
      title='Alterar Retorno Fixo'
      visible={visible}
      destroyOnClose
      footer={null}
      onCancel={handleCancel}
    >
      <div>
        <Form initialValues={initialValues} onFinish={onFinish}>
          <Form.Item name='monthlyReturn' rules={[{ required: true, message: 'Obrigatório' }]}>
            <InputNumber placeholder='Monthly Return' />
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
