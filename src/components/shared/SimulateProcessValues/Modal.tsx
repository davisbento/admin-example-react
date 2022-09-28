import { Alert, Button, Modal, Typography } from 'antd';
import { IProcessEventList } from 'interfaces/deposit';
import { memo, useCallback, useState } from 'react';
import balanceService from 'services/balance';

import TextGains from '../TextGains';

interface IProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  event: IProcessEventList;
}
const SimulateProcessValues = memo(({ visible, handleCancel, handleOk, event }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [amountToWithdrawl, setAmountToWithdrawl] = useState<number>(null);

  const simulateValues = useCallback(async () => {
    setLoading(true);
    setError(null);
    setAmountToWithdrawl(null);
    try {
      const response = await balanceService.simulateValues(event.id);
      setAmountToWithdrawl(response);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, [event]);

  const processProfitability = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await balanceService.processProfitabilityByEventId(event.id);
      setAmountToWithdrawl(null);
      setLoading(false);
      handleOk();
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, [event, handleOk]);

  const processWithdrawal = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await balanceService.processWithdrawalByEventId(event.id);
      setAmountToWithdrawl(null);
      setLoading(false);
      handleOk();
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, [event, handleOk]);

  return (
    <Modal width={400} title='Simular valores' visible={visible} destroyOnClose footer={null} onCancel={handleCancel}>
      <div className='flex-center'>
        <div>{loading && <div>Carregando...</div>}</div>

        {error && <Alert message='Error' description={error} showIcon type='error' />}

        {amountToWithdrawl && (
          <div>
            <Typography>
              Valor calculado: <TextGains value={amountToWithdrawl} digits={8} />
            </Typography>
          </div>
        )}

        <div className='mt' />

        {amountToWithdrawl ? (
          <div className='row-center' style={{ gap: 8 }}>
            <Button type='primary' onClick={processWithdrawal} loading={loading}>
              Sacar valor
            </Button>
            <Button type='default' onClick={processProfitability} loading={loading}>
              Processar rentabilidade
            </Button>
          </div>
        ) : (
          <Button type='primary' onClick={simulateValues} loading={loading}>
            Simular saque/rentabilidade com a porcentagem atual
          </Button>
        )}
      </div>
    </Modal>
  );
});

export default SimulateProcessValues;
