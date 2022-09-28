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

export const UnfrozenTotal = memo(({ currency }: IProps) => {
  const { data, loading } = useFetch(() => depositService.getDepositUnfrozenByCurrency(currency), []);
  return (
    <Card>
      {loading ? (
        <Loader />
      ) : (
        <Statistic
          title='Total NÃO congelado'
          value={data}
          precision={8}
          valueStyle={{ color: currency === EnCurrency.BTC ? '#f7931a' : '#606afc' }}
          prefix={<Icon name={currency.toLowerCase()} size={25} />}
        />
      )}
    </Card>
  );
});
