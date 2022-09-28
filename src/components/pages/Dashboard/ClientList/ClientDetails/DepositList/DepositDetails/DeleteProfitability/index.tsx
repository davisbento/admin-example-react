import { PermissionButton } from 'components/shared/PermissionButton';
import { useModal } from 'hooks/useModal';
import { EnDepositEventStatus, IDepositEventList } from 'interfaces/deposit';
import { Fragment, memo } from 'react';

import { DeleteBalanceModal } from './Modal';

interface IProps {
  event: IDepositEventList;
  onComplete: () => void;
}

export const DeleteBalanceButton = memo(({ event, onComplete }: IProps) => {
  const [visible, setVisible] = useModal();

  if (event?.status !== EnDepositEventStatus.EXECUTED) {
    return null;
  }

  // if (!isDateBeforeToday(new Date(event.dateToExecute))) {
  //   return null;
  // }

  return (
    <Fragment>
      {visible && (
        <DeleteBalanceModal visible={visible} event={event} handleOk={onComplete} handleCancel={setVisible} />
      )}

      <PermissionButton type='default' className='button-danger' onClick={setVisible} text='Deletar Rentabilidade' />
    </Fragment>
  );
});
