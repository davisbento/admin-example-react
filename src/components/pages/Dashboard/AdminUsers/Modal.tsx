import { Alert, Button, Checkbox, Form, Input, Modal, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { openNotification } from 'facades/notification';
import { IUserCreate, RoleEnum, rolesArray } from 'interfaces/user';
import { memo, useCallback, useState } from 'react';
import userService from 'services/user';

const { Option } = Select;

interface IProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
const UserModal = memo(({ visible, handleCancel, handleOk }: IProps) => {
  const [initialValues] = useState<IUserCreate>({ password: '', email: '', name: '', roles: [] });
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState(undefined);

  const onFinish = async (values: IUserCreate) => {
    setError(undefined);
    setLoading(true);
    try {
      await userService.create(values);
      setLoading(false);
      openNotification('success', 'Success, user created');
      handleOk();
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const handleSelecteAdmin = useCallback(
    (e: CheckboxChangeEvent) => {
      if (e.target.checked) {
        setAdmin(true);
        form.setFieldsValue({
          roles: ['admin_full']
        });
        return;
      }

      setAdmin(false);
      form.setFieldsValue({
        roles: []
      });
      return;
    },
    [form]
  );

  return (
    <Modal width={700} title='Create new user' visible={visible} destroyOnClose footer={null} onCancel={handleCancel}>
      <div>
        {error && <Alert message={error} type='error' showIcon />}

        <div className='mt' />

        <Form initialValues={initialValues} onFinish={onFinish} form={form}>
          <Form.Item name='email' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input placeholder='New E-mail' />
          </Form.Item>

          <Form.Item name='name' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input placeholder='New Name' />
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: 'Obrigatório' }]}>
            <Input placeholder='New Password' />
          </Form.Item>

          <Form.Item>
            <Checkbox onChange={handleSelecteAdmin}>Is Admin?</Checkbox>
          </Form.Item>

          <Form.Item name='roles' rules={[{ required: admin ? false : true, message: 'Obrigatório', type: 'array' }]}>
            <Select mode='multiple' placeholder='Select role[multiple]' disabled={admin}>
              {rolesArray.map((item, index) => {
                if (item.value === RoleEnum.ADMIN_FULL) return null;
                return (
                  <Option key={index} value={item.value}>
                    {item.name}
                  </Option>
                );
              })}
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

export default UserModal;
