import { PermissionButton } from 'components/shared/PermissionButton';
import { useModal } from 'hooks/useModal';
import { Fragment, memo } from 'react';

import { CreateProfitabilityModal } from './Modal';

interface IProps {
  onComplete: () => void;
  consultantId: string;
}

export const CreateProfitabilityConsultant = memo(({ onComplete, consultantId }: IProps) => {
  const [visible, setVisible] = useModal();

  return (
    <Fragment>
      {visible && (
        <CreateProfitabilityModal
          consultantId={consultantId}
          visible={visible}
          handleOk={onComplete}
          handleCancel={setVisible}
        />
      )}

      <PermissionButton type='primary' onClick={setVisible} text='Nova Rentabilidade' />
    </Fragment>
  );
});
