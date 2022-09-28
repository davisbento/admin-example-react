import { TablePaginationConfig, Typography } from 'antd';
import useFetch from 'hooks/useFetch';
import { usePagination } from 'hooks/usePagination';
import { IClientList } from 'interfaces/client';
import { IParams } from 'interfaces/pagination';
import { Fragment, memo, useCallback, useState } from 'react';
import clientService from 'services/client';

import ClientDetails from './ClientDetails';
import CreateNewClientButton from './CreateNewClient';
import Filter from './Filter';
import List from './Table';

const { Title } = Typography;

const ClientList = memo(() => {
  const [initialPagination] = usePagination();
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [client, setClient] = useState<IClientList>(null);
  const [filter, setFilter] = useState<IParams>({ term: '', ...initialPagination });

  const { data, loading, fetchData } = useFetch(() => clientService.getAll({ ...filter }), [filter]);

  const handleChangePagination = useCallback(
    (newPagination: TablePaginationConfig) =>
      setFilter({ ...filter, page: newPagination.current, pageSize: newPagination.pageSize }),
    [filter]
  );

  const onCompleteFilter = useCallback(
    (values: string) => {
      setVisibleDetails(false);
      setFilter({ term: values, ...initialPagination });
    },
    [initialPagination]
  );

  const handleOpenDetails = useCallback(
    (client: IClientList) => {
      setClient(client);
      setVisibleDetails(true);
    },
    [setVisibleDetails]
  );

  const handleCloseDetails = useCallback(() => {
    setClient(null);
    setVisibleDetails(false);
  }, [setVisibleDetails]);

  return (
    <Fragment>
      <div>
        <div className='header-container'>
          <Title level={3}>Buscar Clientes</Title>
        </div>
        <div className='content-container'>
          <CreateNewClientButton onComplete={() => fetchData()} />

          <div className='mt'></div>

          <Filter onCompleteFilter={onCompleteFilter} />

          {visibleDetails ? (
            <ClientDetails
              visible={visibleDetails}
              handleCancel={handleCloseDetails}
              client={client}
              retryClients={() => fetchData()}
            />
          ) : (
            <List
              handleOpenModal={handleOpenDetails}
              data={data}
              loading={loading}
              handleChangePagination={handleChangePagination}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
});

export default ClientList;
