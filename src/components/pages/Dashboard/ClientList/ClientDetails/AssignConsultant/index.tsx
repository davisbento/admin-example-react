import { Button, Modal, Select, Spin } from 'antd';
import { SelectProps } from 'antd/es/select';
import { openNotification } from 'facades/notification';
import debounce from 'lodash/debounce';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import consultantService from 'services/consultant';

export interface DebounceSelectProps<ValueType = any> extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any>({
  fetchOptions,
  debounceTimeout = 800,
  ...props
}: DebounceSelectProps) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then(newOptions => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select<ValueType>
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      showSearch
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
      options={options}
    />
  );
}

// Usage of DebounceSelect
interface UserValue {
  label: string;
  value: string;
  key?: string;
}

async function fetchUserList(username: string): Promise<UserValue[]> {
  const response = await consultantService.getAll({ term: username, page: 1, pageSize: 50 });

  return response.data.map(user => ({
    label: `${user.displayName}`,
    value: user.id
  }));
}

interface IProps {
  clientId: string;
  handleCompleteConsultant: (consultant: string) => void;
}

export const AssignConsultant = ({ clientId, handleCompleteConsultant }: IProps) => {
  const [value, setValue] = useState<UserValue>(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = useCallback(async () => {
    try {
      setLoading(true);
      await consultantService.assignConsultant(clientId, value.value);
      handleCompleteConsultant(value.label);
      openNotification('success', 'Sucesso');
      setVisible(false);
    } catch (err) {
      openNotification('error', err);
    } finally {
      setLoading(false);
    }
  }, [clientId, value, setVisible, setLoading, handleCompleteConsultant]);

  useEffect(() => {
    if (!visible) {
      setValue(null);
    }
  }, [visible]);

  return (
    <Fragment>
      <Button type='default' onClick={() => setVisible(true)}>
        Atribuir Consultor
      </Button>

      <Modal
        width={700}
        title='Atribuir consultor ao cliente'
        visible={visible}
        destroyOnClose
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <div>
          <DebounceSelect
            value={value}
            placeholder='Digite para buscar o consultor'
            fetchOptions={fetchUserList}
            onChange={setValue}
            style={{ width: '100%' }}
          />

          <div className='mt'></div>

          <Button
            loading={loading}
            disabled={!value?.value}
            type='primary'
            onClick={handleOk}
            className='button-full-width'
          >
            Confirmar
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};
