import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import SimulateProcessValues from 'components/shared/SimulateProcessValues';
import { addOneDayAndFormat } from 'facades/date';
import { formatCurrency } from 'facades/money';
import { EnDepositEventStatus, IEventsCloseToExecute } from 'interfaces/deposit';
import { memo } from 'react';

interface IProps {
  data: IEventsCloseToExecute[];
  loading: boolean;
  fetchData: () => void;
}

export const EventsCloseToExecuteTable = memo(({ data, loading, fetchData }: IProps) => {
  return (
    <div>
      <Table rowKey='id' loading={loading} dataSource={loading ? [] : data}>
        <Column title='Cliente' dataIndex='clientName' />
        <Column title='Consultor' dataIndex='consultant' />
        <Column
          title='Data Execu.'
          dataIndex='dateToExecute'
          render={(val: string) => (val ? <span>{addOneDayAndFormat(val)}</span> : '-')}
        />
        <Column
          title='Saldo Atualizado'
          dataIndex='total'
          render={(val: number, item: IEventsCloseToExecute) => (
            <span>
              {item.currency} {formatCurrency(val, 8)}
            </span>
          )}
        />
        <Column
          title='#'
          dataIndex='action'
          render={(_, record: IEventsCloseToExecute) => (
            <div className='flex-start-column'>
              <SimulateProcessValues
                event={{ id: record.id, status: EnDepositEventStatus.WAITING, dateToExecute: record.dateToExecute }}
                onComplete={fetchData}
              />
            </div>
          )}
        />
      </Table>
    </div>
  );
});
