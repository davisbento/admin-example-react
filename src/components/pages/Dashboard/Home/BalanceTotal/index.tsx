import { Card, Statistic } from 'antd';
import Loader from 'components/shared/Loader';
import useFetch from 'hooks/useFetch';
import { EnCurrency } from 'interfaces/currency';
import { memo } from 'react';
import Icon from 'react-crypto-icons';
import balanceService from 'services/balance';

interface IProps {
  currency: EnCurrency;
}

export const BalanceTotal = memo(({ currency }: IProps) => {
  const { data, loading } = useFetch(() => balanceService.getBalanceTotalByCurrency(currency), []);
  return (
    <Card>
      {loading ? (
        <Loader />
      ) : (
        <Statistic
          title='Total de aportes + rendimentos'
          value={data}
          precision={8}
          valueStyle={{ color: currency === EnCurrency.BTC ? '#f7931a' : '#606afc' }}
          prefix={<Icon name={currency.toLowerCase()} size={25} />}
        />
      )}
    </Card>
  );
});
