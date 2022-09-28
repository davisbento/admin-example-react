import { Spin } from 'antd';
import { memo } from 'react';

const Loader = memo(() => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin />
    </div>
  );
});

export default Loader;
