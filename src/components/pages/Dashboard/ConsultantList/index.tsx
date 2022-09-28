import { TablePaginationConfig, Typography } from 'antd';
import useFetch from 'hooks/useFetch';
import { usePagination } from 'hooks/usePagination';
import { IConsultantList } from 'interfaces/consultant';
import { IParams } from 'interfaces/pagination';
import { Fragment, memo, useCallback, useState } from 'react';
import consultantService from 'services/consultant';

import { ConsultantDetails } from './ConsultantDetails';
import { CreateNewConsultantButton } from './CreateNewConsultant';
import { SearchConsultantsFilter } from './Filter';
import { ConsultantTable } from './Table';

const { Title } = Typography;

const ConsultantList = memo(() => {
  const [initialPagination] = usePagination();
  const [filter, setFilter] = useState<IParams>({ term: '', ...initialPagination });
  const [consultant, setConsultant] = useState<IConsultantList>(null);

  const { data, loading, fetchData } = useFetch(() => consultantService.getAll({ ...filter }), [filter]);

  const handleChangePagination = useCallback(
    (newPagination: TablePaginationConfig) =>
      setFilter({ ...filter, page: newPagination.current, pageSize: newPagination.pageSize }),
    [filter]
  );

  const onCompleteFilter = useCallback(
    (values: string) => {
      setFilter({ term: values, ...initialPagination });
    },
    [initialPagination]
  );

  const handleOpenDetails = (consultant: IConsultantList) => {
    setConsultant(consultant);
  };

  return (
    <Fragment>
      <div>
        <div className='header-container'>
          <Title level={3}>Buscar Consultores</Title>
        </div>
        <div className='content-container'>
          <CreateNewConsultantButton onComplete={() => fetchData()} />

          <div className='mt'></div>

          <SearchConsultantsFilter onCompleteFilter={onCompleteFilter} />

          {consultant ? (
            <ConsultantDetails
              visible={!!consultant}
              handleCancel={() => setConsultant(null)}
              consultant={consultant}
            />
          ) : (
            <ConsultantTable
              data={data}
              loading={loading}
              handleChangePagination={handleChangePagination}
              handleOpenDetails={handleOpenDetails}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
});

export default ConsultantList;
