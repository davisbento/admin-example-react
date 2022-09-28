import { Spin } from 'antd';
import { memo } from 'react';

const ScreenLoader = memo(() => {
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <Spin />
      </div>
    </div>
  );
});

export default ScreenLoader;
