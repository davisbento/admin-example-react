import { Button } from 'antd';
import { useModal } from 'hooks/useModal';
import { Fragment, memo } from 'react';

import { CreateNewConsultantModal } from './Modal';

interface IProps {
  onComplete: () => void;
}

export const CreateNewConsultantButton = memo(({ onComplete }: IProps) => {
  const [visible, setVisible] = useModal();

  return (
    <Fragment>
      {visible && <CreateNewConsultantModal visible={visible} handleOk={onComplete} handleCancel={setVisible} />}

      <Button type='primary' onClick={setVisible}>
        Criar Novo Consultor
      </Button>
    </Fragment>
  );
});
