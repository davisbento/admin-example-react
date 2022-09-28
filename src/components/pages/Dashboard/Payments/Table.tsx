import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import addDays from 'date-fns/addDays';
import { addOneDayAndFormat, dateFormat } from 'facades/date';
import { formatCurrency } from 'facades/money';
import { IPaymentList } from 'interfaces/payment';
import { Fragment, memo } from 'react';

import { ConfirmPaymentButton } from './PaymentButton';

interface IProps {
  data: IPaymentList[];
  loading: boolean;
  fetchPayments: () => void;
}

export const PaymentList = memo(({ data, loading, fetchPayments }: IProps) => {
  return (
    <Fragment>
      <Table rowKey='id' loading={loading} dataSource={loading ? [] : data}>
        <Column title='Cliente' dataIndex='clientName' />
        <Column
          title='Data de Inicio'
          dataIndex='confirmedAt'
          render={(val: string) => (val ? <span>{addOneDayAndFormat(val)}</span> : '-')}
        />
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
          title='Fração'
          dataIndex='amount'
          render={(val: number, item: IPaymentList) => (
            <span>
              {item.currency} {formatCurrency(val, 8)}
            </span>
          )}
        />
        <Column
          title='Carteiras'
          dataIndex='wallets'
          render={(val: IPaymentList['wallets']) => (
            <div>
              {val.map((item, idx) => (
                <span key={idx}>{item?.address ? `${item.currency}: ${item.address}` : '-'}</span>
              ))}
            </div>
          )}
        />
        <Column
          title='#'
          dataIndex='action'
          render={(_, record: IPaymentList) => <ConfirmPaymentButton payment={record} onComplete={fetchPayments} />}
        />
      </Table>
    </Fragment>
  );
});
