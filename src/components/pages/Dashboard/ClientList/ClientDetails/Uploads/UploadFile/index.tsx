import { Button, Card } from 'antd';
import Loader from 'components/shared/Loader';
import { openNotification } from 'facades/notification';
import { eType } from 'interfaces/client';
import { memo, useMemo, useState } from 'react';
import clientService from 'services/client';

interface IProps {
  clientId: string;
  files: { id: string; url: string; type: string }[];
  title: string;
  loading: boolean;
  fetchData: () => void;
  type: eType;
}

export const UploadFile = memo(({ clientId, files, type, title, fetchData, loading: isLoadingFiles }: IProps) => {
  const [file, setFile] = useState<File>(null);

  const [loading, setLoading] = useState(false);

  const onFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const upload = async () => {
    if (!file) {
      openNotification('error', 'Please select a file');
      return;
    }

    try {
      setLoading(true);
      await clientService.uploadFile(clientId, file, type);
      openNotification('success', 'File uploaded successfully');
      fetchData();
    } catch (error) {
      openNotification('error', 'Error uploading file');
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  const renderFiles = useMemo(() => {
    if (isLoadingFiles) {
      return <Loader />;
    }

    if (files.length) {
      return (
        <div>
          {files.map((file, index) => (
            <div key={file.id}>
              <a href={file.url} target='_blank'>
                Arquivo {index + 1}
              </a>
            </div>
          ))}

          <div className='mt'></div>
        </div>
      );
    }

    return null;
  }, [files, isLoadingFiles]);

  return (
    <Card title={title} bordered>
      {renderFiles}

      {!isLoadingFiles && (
        <div>
          <input type='file' onChange={onFileChange} />
          <div className='mt'></div>
          {file && (
            <Button onClick={upload} type='primary' loading={loading}>
              Clique para confirmar o upload!
            </Button>
          )}
        </div>
      )}
    </Card>
  );
});
