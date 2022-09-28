import { Button } from 'antd';
import { isDateBeforeToday } from 'facades/date';
import { useModal } from 'hooks/useModal';
import { EnDepositEventStatus, IProcessEventList } from 'interfaces/deposit';
import { RoleEnum } from 'interfaces/user';
import { AuthContext } from 'providers/AuthProvider';
import { Fragment, memo, useContext } from 'react';

import Modal from './Modal';

interface IProps {
  event: IProcessEventList;
  onComplete: () => void;
}

const SimulateProcessValuesButton = memo(({ event, onComplete }: IProps) => {
  const { user } = useContext(AuthContext);

  const [visible, setVisible] = useModal();

  const handleComplete = () => {
    setVisible();
    onComplete();
  };

  if (!event || event.status !== EnDepositEventStatus.WAITING) {
    return null;
  }

  if (user?.roles.includes(RoleEnum.CONSULTANT) && !isDateBeforeToday(new Date(event.dateToExecute))) {
    return null;
  }

  return (
    <Fragment>
      {visible && <Modal visible={visible} event={event} handleOk={handleComplete} handleCancel={setVisible} />}

      <Button type='primary' onClick={setVisible}>
        Simular Valores
      </Button>
    </Fragment>
  );
});

export default SimulateProcessValuesButton;
