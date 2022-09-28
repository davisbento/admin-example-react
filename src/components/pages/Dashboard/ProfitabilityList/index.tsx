import { Typography } from 'antd';
import useFetch from 'hooks/useFetch';
import { Fragment, memo } from 'react';
import profitabilityService from 'services/profitability';

import { CreateProfitability } from './CreateProfitability';
import List from './Table';

const { Title } = Typography;

const ProfitabilityList = memo(() => {
  const { data, loading, fetchData } = useFetch(() => profitabilityService.getAllProfitability(), []);

  return (
    <Fragment>
      <div>
        <div className='header-container'>
          <Title level={3}>Rentabilidades</Title>
        </div>
        <div className='content-container'>
          <CreateProfitability onComplete={fetchData} />

          <div className='mt'></div>

          <List data={data} loading={loading} fetchData={fetchData} />
        </div>
      </div>
    </Fragment>
  );
});

export default ProfitabilityList;
