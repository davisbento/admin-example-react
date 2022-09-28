import { Typography } from 'antd';
import useFetch from 'hooks/useFetch';
import { Fragment, memo } from 'react';
import depositService from 'services/deposit';

import { EventsCloseToExecuteTable } from './Table';

const { Title } = Typography;

const EventsCloseToExecute = memo(() => {
  const { data, loading, fetchData } = useFetch(() => depositService.getEventsCloseToExecute(), []);

  return (
    <Fragment>
      <div>
        <div className='header-container'>
          <Title level={3}>Eventos próximos a executar</Title>
        </div>
        <div className='content-container'>
          <div className='mt'></div>

          <EventsCloseToExecuteTable data={data} loading={loading} fetchData={fetchData} />
        </div>
      </div>
    </Fragment>
  );
});

export default EventsCloseToExecute;
