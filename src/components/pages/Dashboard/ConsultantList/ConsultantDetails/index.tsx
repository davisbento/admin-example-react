import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Tabs } from 'antd';
import TextInfo from 'components/shared/TextInfo';
import useFetch from 'hooks/useFetch';
import { IConsultantList } from 'interfaces/consultant';
import { memo, useState } from 'react';
import consultantService from 'services/consultant';

import { ChangeConsultantPasswordButton } from './ChangePassword';
import { CreateProfitabilityConsultant } from './CreateProfitability';
import { ProfitabilityTable } from './ProfitabilityTable';

const { TabPane } = Tabs;

interface IProps {
  visible: boolean;
  handleCancel: () => void;
  consultant: IConsultantList;
}

export const ConsultantDetails = memo(({ visible, consultant, handleCancel }: IProps) => {
  const [consultantId] = useState(consultant.id);
  const [tabs, setTabs] = useState<string>('profitability');

  const { data, loading, fetchData } = useFetch(() => consultantService.getProfitability(consultant.id), []);

  if (!visible) return null;

  const renderProfitable = () => {
    if (loading) {
      return <div>Carregando...</div>;
    }

    if (!data?.length) {
      return <div>Nenhum resultado encontrado</div>;
    }

    return <ProfitabilityTable data={data} loading={loading} fetchData={fetchData} />;
  };

  return (
    <div className='content-card'>
      <Button type='default' icon={<ArrowLeftOutlined />} onClick={handleCancel}>
        Voltar
      </Button>

      <div className='mt' />

      <Divider>Dados do Consultor</Divider>
      <Row gutter={16}>
        <Col span={6}>
          <TextInfo title='ID' text={consultantId} />
          <TextInfo title='Name' text={consultant.displayName} />
        </Col>
        <Col span={3}></Col>
        <Col span={3}>
          <ChangeConsultantPasswordButton consultantId={consultantId} />
        </Col>
      </Row>

      <div className='mt'></div>

      <Tabs onChange={value => setTabs(value)} type='card' activeKey={tabs}>
        <TabPane tab='Rentabilidades' key='profitability'>
          <CreateProfitabilityConsultant consultantId={consultantId} onComplete={fetchData} />
          <div className='mt'></div>
          {renderProfitable()}
        </TabPane>
      </Tabs>
    </div>
  );
});
