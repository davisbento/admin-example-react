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

const ProcessDepositEvent = memo(({ event, onComplete }: IProps) => {
  const { user } = useContext(AuthContext);

  const [visible, setVisible] = useModal();

  if (!event || event.status !== EnDepositEventStatus.WAITING) {
    return null;
  }

  if (user?.roles.includes(RoleEnum.CONSULTANT) && !isDateBeforeToday(new Date(event.dateToExecute))) {
    return null;
  }

  return (
    <Fragment>
      {visible && <Modal visible={visible} event={event} handleOk={onComplete} handleCancel={setVisible} />}

      <Button type='default' onClick={setVisible}>
        Processar Evento
      </Button>
    </Fragment>
  );
});

export default ProcessDepositEvent;
