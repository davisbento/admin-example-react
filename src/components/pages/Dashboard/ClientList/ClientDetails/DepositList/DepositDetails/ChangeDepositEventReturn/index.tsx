import { PermissionButton } from 'components/shared/PermissionButton';
import { useModal } from 'hooks/useModal';
import { IDepositEventList } from 'interfaces/deposit';
import { Fragment, memo } from 'react';

import Modal from './Modal';

interface IProps {
  event: IDepositEventList;
  onComplete: () => void;
}

const ChangeDepositEventReturnButton = memo(({ event, onComplete }: IProps) => {
  const [visible, setVisible] = useModal();

  return (
    <Fragment>
      {visible && <Modal visible={visible} event={event} handleOk={onComplete} handleCancel={setVisible} />}
      <PermissionButton type='primary' onClick={setVisible} text=' Alterar Retorno Fixo' />
    </Fragment>
  );
});

export default ChangeDepositEventReturnButton;
