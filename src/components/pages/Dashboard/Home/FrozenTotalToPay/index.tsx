import { Card, Statistic } from 'antd';
import Loader from 'components/shared/Loader';
import useFetch from 'hooks/useFetch';
import { EnCurrency } from 'interfaces/currency';
import { memo } from 'react';
import Icon from 'react-crypto-icons';
import depositService from 'services/deposit';

interface IProps {
  currency: EnCurrency;
}

export const FrozenTotalToPay = memo(({ currency }: IProps) => {
  const { data, loading } = useFetch(() => depositService.getDepositFrozenToPayByCurrency(currency), []);
  return (
    <Card>
      {loading ? (
        <Loader />
      ) : (
        <Statistic
          title='Total congelado a ser pago'
          value={data}
          precision={8}
          valueStyle={{ color: currency === EnCurrency.BTC ? '#f7931a' : '#606afc' }}
          prefix={<Icon name={currency.toLowerCase()} size={25} />}
        />
      )}
    </Card>
  );
});
