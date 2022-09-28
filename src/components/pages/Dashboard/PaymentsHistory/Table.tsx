import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import addDays from 'date-fns/addDays';
import { dateFormat } from 'facades/date';
import { formatCurrency } from 'facades/money';
import { IPaymentHistoryList } from 'interfaces/payment';
import { Fragment, memo } from 'react';

interface IProps {
  data: IPaymentHistoryList[];
  loading: boolean;
}

export const PaymentHistoryList = memo(({ data, loading }: IProps) => {
  return (
    <Fragment>
      <Table rowKey='id' loading={loading} dataSource={loading ? [] : data}>
        <Column title='Cliente' dataIndex='clientName' />
        <Column
          title='Competência'
          dataIndex='monthRef'
          render={(val: string) =>
            val ? (
              <div>
                {dateFormat(addDays(new Date(val), 1).toISOString(), 'MMMM').toUpperCase()}/
                {dateFormat(addDays(new Date(val), 1).toISOString(), 'yyyy').toUpperCase()}
              </div>
            ) : (
              '-'
            )
          }
        />
        <Column
          title='Pago em'
          dataIndex='paidAt'
          render={(val: string) => (val ? <div>{dateFormat(val, 'dd/MM/yyyy HH:mm')}</div> : '-')}
        />
        <Column
          title='Fração'
          dataIndex='amount'
          render={(val: number, item: IPaymentHistoryList) => (
            <span>
              {item.currency} {formatCurrency(val, 8)}
            </span>
          )}
        />
        <Column
          title='Endereço pago'
          dataIndex='addressPaid'
          render={(val: string, record: IPaymentHistoryList) => (
            <span>
              {record.currency}: {val}
            </span>
          )}
        />
      </Table>
    </Fragment>
  );
});
