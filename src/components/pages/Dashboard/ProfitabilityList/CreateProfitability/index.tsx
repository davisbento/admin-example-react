import { PermissionButton } from 'components/shared/PermissionButton';
import { useModal } from 'hooks/useModal';
import { Fragment, memo } from 'react';

import { CreateProfitabilityModal } from './Modal';

interface IProps {
  onComplete: () => void;
}

export const CreateProfitability = memo(({ onComplete }: IProps) => {
  const [visible, setVisible] = useModal();

  return (
    <Fragment>
      {visible && <CreateProfitabilityModal visible={visible} handleOk={onComplete} handleCancel={setVisible} />}

      <PermissionButton type='primary' onClick={setVisible} text='Nova Rentabilidade' />
    </Fragment>
  );
});
