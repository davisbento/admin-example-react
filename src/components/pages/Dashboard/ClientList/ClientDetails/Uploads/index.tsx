import { Col, Row } from 'antd';
import useFetch from 'hooks/useFetch';
import { memo } from 'react';
import clientService from 'services/client';

import { UploadFile } from './UploadFile';

interface IProps {
  clientId: string;
}

export const Uploads = memo(({ clientId }: IProps) => {
  const { data, fetchData, loading } = useFetch(() => clientService.getAllUploads(clientId), []);

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <UploadFile
          loading={loading}
          fetchData={fetchData}
          title='Endereço'
          type='address'
          clientId={clientId}
          files={data?.filter(item => item.type === 'address') || []}
        />
      </Col>
      <Col span={12}>
        <UploadFile
          loading={loading}
          fetchData={fetchData}
          title='Documentação'
          type='documentation'
          clientId={clientId}
          files={data?.filter(item => item.type === 'documentation') || []}
        />
      </Col>

      <Col span={8}>
        <UploadFile
          loading={loading}
          fetchData={fetchData}
          title='Selfie'
          type='selfie'
          clientId={clientId}
          files={data?.filter(item => item.type === 'selfie') || []}
        />
      </Col>

      <Col span={8}>
        <UploadFile
          loading={loading}
          fetchData={fetchData}
          title='Documentos'
          type='documents'
          clientId={clientId}
          files={data?.filter(item => item.type === 'documents') || []}
        />
      </Col>

      <Col span={8}>
        <UploadFile
          loading={loading}
          fetchData={fetchData}
          title='Contrato assinado'
          type='contractSigned'
          clientId={clientId}
          files={data?.filter(item => item.type === 'contractSigned') || []}
        />
      </Col>
    </Row>
  );
});
