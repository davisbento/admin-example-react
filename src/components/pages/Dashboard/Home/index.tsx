import { Col, Row, Typography } from 'antd';
import { EnCurrency } from 'interfaces/currency';
import { Fragment, memo } from 'react';

import { BalanceTotal } from './BalanceTotal';
import { DepositTotal } from './DepositTotal';
import { FrozenTotal } from './FrozenTotal';
import { FrozenTotalToPay } from './FrozenTotalToPay';
import { UnfrozenTotal } from './UnfrozenTotal';

const { Title } = Typography;

const Home = memo(() => {
  return (
    <Fragment>
      <div className='header-container'>
        <Title level={3}>Dashboard</Title>

        <Row gutter={8}>
          <Col span={6}>
            <DepositTotal currency={EnCurrency.BTC} />
          </Col>
          <Col span={6}>
            <DepositTotal currency={EnCurrency.ETH} />
          </Col>
          <Col span={6}>
            <BalanceTotal currency={EnCurrency.BTC} />
          </Col>
          <Col span={6}>
            <BalanceTotal currency={EnCurrency.ETH} />
          </Col>
        </Row>

        <div className='mt'></div>

        <Row gutter={8}>
          <Col span={6}>
            <FrozenTotal currency={EnCurrency.BTC} />
          </Col>
          <Col span={6}>
            <FrozenTotal currency={EnCurrency.ETH} />
          </Col>
          <Col span={6}>
            <FrozenTotalToPay currency={EnCurrency.BTC} />
          </Col>
          <Col span={6}>
            <FrozenTotalToPay currency={EnCurrency.ETH} />
          </Col>
        </Row>

        <div className='mt'></div>

        <Row gutter={8}>
          <Col span={6}>
            <UnfrozenTotal currency={EnCurrency.BTC} />
          </Col>
          <Col span={6}>
            <UnfrozenTotal currency={EnCurrency.ETH} />
          </Col>
        </Row>
      </div>
    </Fragment>
  );
});

export default Home;
