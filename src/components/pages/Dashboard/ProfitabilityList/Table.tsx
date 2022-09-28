import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import addDays from 'date-fns/addDays';
import { dateFormat } from 'facades/date';
import { formatCurrency } from 'facades/money';
import { IProfitability } from 'interfaces/profitability';
import { memo } from 'react';

import { ChangeProfitabilityReturnButton } from './ChangeProfitabilityReturn';

interface IProps {
  data: IProfitability[];
  loading: boolean;
  fetchData: () => void;
}

const ProfitabilityTable = memo(({ data, loading, fetchData }: IProps) => {
  return (
    <div>
      <Table rowKey='id' loading={loading} dataSource={loading ? [] : data}>
        <Column
          title='Data'
          dataIndex='date'
          render={(item: string) => (
            <div>
              {dateFormat(addDays(new Date(item), 1).toISOString(), 'MMMM').toUpperCase()}/
              {dateFormat(addDays(new Date(item), 1).toISOString(), 'yyyy').toUpperCase()}
            </div>
          )}
        />
        <Column title='Valor' dataIndex='value' render={(item: number) => `${formatCurrency(item)}%`} />
        <Column title='Moeda' dataIndex='currency' />
        <Column
          title='#'
          dataIndex='action'
          render={(_, record: IProfitability) => (
            <div>
              <ChangeProfitabilityReturnButton profit={record} onComplete={fetchData} />
            </div>
          )}
        />
      </Table>
    </div>
  );
});

export default ProfitabilityTable;
