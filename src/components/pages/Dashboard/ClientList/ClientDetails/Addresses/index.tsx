import Loader from 'components/shared/Loader';
import useFetch from 'hooks/useFetch';
import { memo } from 'react';
import clientService from 'services/client';

import { AddressesForm } from './Form';

interface IProps {
  clientId: string;
}

export const Addresses = memo(({ clientId }: IProps) => {
  const { data, loading, error } = useFetch(() => clientService.getDetails(clientId), []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  return <AddressesForm data={data?.address || null} clientId={clientId} />;
});
