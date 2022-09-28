import { CopyFilled } from '@ant-design/icons';
import { Input } from 'antd';
import { openNotification } from 'facades/notification';
import { memo, useCallback } from 'react';

interface IProps {
  placeholder?: string;
  value: string;
  width?: number;
}

export const InputCopy = memo(({ placeholder, value, width }: IProps) => {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value);
    openNotification('success', 'Copiado para a área de transferencia');
  }, [value]);

  return (
    <Input
      style={width ? { width } : { width: '100%' }}
      id='inputCopy'
      value={value}
      addonAfter={<CopyFilled onClick={handleCopy} />}
      placeholder={placeholder || ''}
    />
  );
});
