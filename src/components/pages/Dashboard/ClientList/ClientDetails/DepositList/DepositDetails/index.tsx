import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Divider, Spin, Table, Tag, Typography } from 'antd';
import Column from 'antd/lib/table/Column';
import { PermissionButton } from 'components/shared/PermissionButton';
import ProcessDepositEventButton from 'components/shared/ProcessDepositEvent';
import SimulateProcessValuesButton from 'components/shared/SimulateProcessValues';
import { addOneDayAndFormat } from 'facades/date';
import { displayDepositEventStatusColor, formatDepositEventStatus } from 'facades/formatStatus';
import { formatCurrency } from 'facades/money';
import { openNotification } from 'facades/notification';
import useFetch from 'hooks/useFetch';
import { EnDepositEventStatus, IDepositEventList, IDepositList } from 'interfaces/deposit';
import { memo, useState } from 'react';
import { useRecoilState } from 'recoil';
import depositService from 'services/deposit';
import { depositListState } from 'states/depositListState';

import ChangeDepositEventReturnButton from './ChangeDepositEventReturn';
import { CreatePartialBalanceButton } from './CreatePartialBalance';
import { DeleteBalanceButton } from './DeleteProfitability';

const { Title } = Typography;

interface IProps {
  visible: boolean;
  handleCancel: () => void;
  deposit: IDepositList;
  clientId: string;
}

const DepositDetails = memo(({ visible, deposit, handleCancel, clientId }: IProps) => {
  const [, setShouldUpdateList] = useRecoilState(depositListState);

  const { data, loading, fetchData } = useFetch(() => depositService.getDepositsEvents(deposit.id), []);
  const {
    data: balance,
    loading: loadingBalance,
    fetchData: fetchBalance
  } = useFetch(() => depositService.getSumBalanceByClientIdAndDepositId(clientId, deposit.id), []);

  const [isLoading, setIsLoading] = useState(false);

  const generateEvents = async () => {
    setIsLoading(true);
    try {
      await depositService.generateDepositEvents(deposit.id);
      openNotification('success', 'Success');
      fetchData();
    } catch (err) {
      openNotification('error', err);
    }
    setIsLoading(false);
  };

  const onCompleteProcessEvent = () => {
    setShouldUpdateList(true);
    fetchBalance();
    fetchData();
  };

  const onCompleteCreateBalance = () => {
    setShouldUpdateList(true);
    fetchBalance();
  };

  if (!visible) return null;

  return (
    <div className='content-card'>
      <Button type='default' icon={<ArrowLeftOutlined />} onClick={handleCancel}>
        Voltar
      </Button>

      <div className='mt' />

      {!loading && (data?.length || 0) === 0 && (
        <PermissionButton type='primary' onClick={generateEvents} loading={isLoading} text='Gerar Eventos' />
      )}

      {loadingBalance ? (
        <Spin />
      ) : (
        <div>
          <Title level={4}>Saldo Atualizado desse deposito:</Title>
          <Tag color='success' style={{ fontSize: 15 }}>
            {deposit?.currency || ''} {formatCurrency(balance ?? 0, 8)}
          </Tag>

          <CreatePartialBalanceButton deposit={deposit} clientId={clientId} onComplete={onCompleteCreateBalance} />
        </div>
      )}

      <Divider>Eventos do contrato</Divider>
      <Table
        rowKey='id'
        loading={loading}
        dataSource={loading ? [] : data}
        pagination={{
          pageSize: 25
        }}
      >
        <Column
          title='Date to Execute'
          className='hide-on-responsive'
          dataIndex='dateToExecute'
          render={(val: string) => <span>{addOneDayAndFormat(val)}</span>}
        />
        <Column
          title='Status'
          className='hide-on-responsive'
          dataIndex='status'
          render={(val: EnDepositEventStatus) => (
            <Tag color={displayDepositEventStatusColor(val)}>{formatDepositEventStatus(val)}</Tag>
          )}
        />
        <Column
          title='Retorno Fixo'
          className='hide-on-responsive'
          dataIndex='monthlyReturn'
          render={(val: number) => (Number.isFinite(val) ? <span>{formatCurrency(val)}%</span> : '-')}
        />
        <Column
          title='Percentual'
          className='hide-on-responsive'
          dataIndex='percentUsedToCalculate'
          render={(val: number) => (Number.isFinite(val) ? <span>{formatCurrency(val)}%</span> : '-')}
        />
        <Column
          title='Saldo Calculado'
          className='hide-on-responsive'
          dataIndex='balanceCalculated'
          render={(val: number) =>
            Number.isFinite(val) ? (
              <span>
                {deposit.currency} {formatCurrency(val, 8)}
              </span>
            ) : (
              '-'
            )
          }
        />
        <Column
          title='#'
          dataIndex='action'
          render={(_, record: IDepositEventList) => (
            <div className='flex-start-column'>
              <DeleteBalanceButton event={record} onComplete={onCompleteProcessEvent} />
              <ChangeDepositEventReturnButton event={record} onComplete={fetchData} />
              <ProcessDepositEventButton event={record} onComplete={onCompleteProcessEvent} />
              <SimulateProcessValuesButton
                event={{ id: record.id, status: record.status, dateToExecute: record.dateToExecute }}
                onComplete={onCompleteProcessEvent}
              />
            </div>
          )}
        />
      </Table>
    </div>
  );
});

export default DepositDetails;
