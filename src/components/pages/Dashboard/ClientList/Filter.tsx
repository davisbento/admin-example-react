import { Input } from 'antd';
import { memo, useCallback, useState } from 'react';

const { Search } = Input;

interface IProps {
  onCompleteFilter: (term: string) => void;
}

const SearchUsersFilter = memo(({ onCompleteFilter }: IProps) => {
  const [term, setTerm] = useState('');

  const handleChangeFilter = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTerm(e.target.value), []);

  return (
    <div>
      <Search
        value={term}
        placeholder='Buscar por username, e-mail'
        enterButton='Buscar'
        onChange={handleChangeFilter}
        size='large'
        onSearch={onCompleteFilter}
      />

      <div className='mt' />
    </div>
  );
});

export default SearchUsersFilter;
