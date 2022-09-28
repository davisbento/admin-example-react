import { PermissionButton } from 'components/shared/PermissionButton';
import { useModal } from 'hooks/useModal';
import { IProfitability } from 'interfaces/profitability';
import { Fragment, memo } from 'react';

import { ChangeProfitabilityReturnModal } from './Modal';

interface IProps {
  profit: IProfitability;
  onComplete: () => void;
}

export const ChangeProfitabilityReturnButton = memo(({ profit, onComplete }: IProps) => {
  const [visible, setVisible] = useModal();

  return (
    <Fragment>
      {visible && (
        <ChangeProfitabilityReturnModal
          visible={visible}
          profit={profit}
          handleOk={onComplete}
          handleCancel={setVisible}
        />
      )}

      <PermissionButton type='primary' onClick={setVisible} text=' Alterar Retorno Fixo' />
    </Fragment>
  );
});
