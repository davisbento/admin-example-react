import { useCallback, useState } from 'react';

export function useModal(): [boolean, () => void] {
  const [visible, setVisible] = useState(false);

  const handleSetModal = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return [visible, handleSetModal];
}
