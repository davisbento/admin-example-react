import { Card, Statistic } from 'antd';
import Loader from 'components/shared/Loader';
import { EnCurrency } from 'interfaces/currency';
import { memo } from 'react';
import Icon from 'react-crypto-icons';

interface IProps {
  currency: EnCurrency;
  total: number;
  loading: boolean;
}

export const PaymentsTotalCard = memo(({ currency, total, loading }: IProps) => {
  return (
    <Card>
      {loading ? (
        <Loader />
      ) : (
        <Statistic
          title='Total a ser pago'
          value={total}
          precision={8}
          valueStyle={{ color: currency === EnCurrency.BTC ? '#f7931a' : '#606afc' }}
          prefix={<Icon name={currency.toLowerCase()} size={25} />}
        />
      )}
    </Card>
  );
});
