import { Col, Row, Typography } from 'antd';
import useFetch from 'hooks/useFetch';
import { EnCurrency } from 'interfaces/currency';
import { Fragment, memo, useMemo } from 'react';
import paymentService from 'services/payment';

import { PaymentsTotalCard } from './PaymentsTotal';
import { PaymentHistoryList } from './Table';

const { Title } = Typography;

const PaymentsHistory = memo(() => {
  const { data, loading } = useFetch(() => paymentService.getPaymentsExecuted(), []);

  const getTotalBtc = useMemo(() => {
    return data?.length
      ? data.reduce((acc, curr) => {
          if (curr.currency === EnCurrency.BTC) {
            return acc + curr.amount;
          }
          return acc;
        }, 0)
      : 0;
  }, [data]);

  const getTotalEth = useMemo(() => {
    return data?.length
      ? data.reduce((acc, curr) => {
          if (curr.currency === EnCurrency.ETH) {
            return acc + curr.amount;
          }
          return acc;
        }, 0)
      : 0;
  }, [data]);

  return (
    <Fragment>
      <div>
        <div className='header-container'>
          <Title level={3}>Histórico de Pagamentos</Title>
        </div>
        <div className='content-container'>
          <Row gutter={32}>
            <Col span={8}>
              <PaymentsTotalCard loading={loading} currency={EnCurrency.BTC} total={getTotalBtc} />
            </Col>
            <Col span={8}>
              <PaymentsTotalCard loading={loading} currency={EnCurrency.ETH} total={getTotalEth} />
            </Col>
          </Row>

          <div className='mt'></div>

          <PaymentHistoryList data={data} loading={loading} />
        </div>
      </div>
    </Fragment>
  );
});

export default PaymentsHistory;
