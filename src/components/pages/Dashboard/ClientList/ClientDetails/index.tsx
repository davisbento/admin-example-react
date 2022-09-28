import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Input, Row, Spin, Switch, Tabs, Tag } from 'antd';
import Text from 'antd/lib/typography/Text';
import { InputCopy } from 'components/shared/InputCopy';
import TextInfo from 'components/shared/TextInfo';
import { openNotification } from 'facades/notification';
import { IClientList } from 'interfaces/client';
import { RoleEnum } from 'interfaces/user';
import { AuthContext } from 'providers/AuthProvider';
import { Fragment, memo, useCallback, useContext, useState } from 'react';
import clientService from 'services/client';

import { Addresses } from './Addresses';
import { AssignConsultant } from './AssignConsultant';
import { DepositList } from './DepositList';
import { ResetPasswordButton } from './ResetPassword/ResetPasswordButton';
import { Uploads } from './Uploads';

const { TextArea } = Input;
const { TabPane } = Tabs;

interface IProps {
  visible: boolean;
  handleCancel: () => void;
  retryClients: () => void;
  client: IClientList;
}

const ClientDetails = memo(({ visible, client, handleCancel, retryClients }: IProps) => {
  const [userIdentificator] = useState(client.id);
  const [userEmail] = useState(client.email);
  const [consultant, setConsultant] = useState(client?.consultant || null);
  const [tabs, setTabs] = useState<string>('deposits');
  const [otpActive] = useState(client.isOtpActive);
  const [isOcel, setIsOcel] = useState(client.isOcel);
  const [loadingOcel, setLoadingOcel] = useState(false);

  const { user } = useContext(AuthContext);

  const [observation, setObservation] = useState(client.observation);

  const handleChangeObs = useCallback(async () => {
    if (!observation) {
      openNotification('error', 'Observação não pode ser vazia');
      return;
    }

    try {
      clientService.changeObservation(client.id, observation);
      openNotification('success', 'Sucesso');
    } catch (err) {
      openNotification('error', err);
    } finally {
      setLoadingOcel(false);
    }
  }, [client.id, observation]);

  const handleChangeOcel = useCallback(
    async (checked: boolean) => {
      try {
        setLoadingOcel(true);
        await clientService.changeOcel(client.id, checked);
        setIsOcel(checked);
        openNotification('success', 'Sucesso');
        retryClients();
      } catch (err) {
        openNotification('error', err);
      } finally {
        setLoadingOcel(false);
      }
    },
    [client.id, retryClients]
  );

  const handleCompleteConsultant = useCallback(
    async (consultant: string) => {
      setConsultant(consultant);
      retryClients();
    },
    [retryClients]
  );

  if (!visible) return null;

  return (
    <div className='content-card'>
      <Button type='default' icon={<ArrowLeftOutlined />} onClick={handleCancel}>
        Voltar
      </Button>

      <div className='mt' />

      <Divider>Dados do Cliente</Divider>
      <Row gutter={16}>
        <Col span={12}>
          <TextInfo title='ID' text={userIdentificator} />
          <TextInfo title='Name' text={client.name} />
          <TextInfo title='Username' text={client.username} />
          <TextInfo title='E-mail' text={userEmail} />
          <Text strong>Carteiras</Text>
          <div>
            {client?.wallets?.map(wallet => (
              <div key={wallet.address} className='row-start' style={{ gap: 16 }}>
                {wallet.currency} <InputCopy value={wallet.address} width={350} />
              </div>
            ))}
          </div>

          <Text strong>Observação</Text>

          <div className='row-start' style={{ gap: 8 }}>
            <TextArea
              value={observation}
              onChange={e => setObservation(e.target.value)}
              style={{ width: 400 }}
              rows={4}
            />

            <Button onClick={handleChangeObs}>Salvar OBS</Button>
          </div>
        </Col>

        {user?.roles?.includes(RoleEnum.ADMIN_FULL) ? (
          <Col span={6}>
            <div className='row'>
              <TextInfo
                title='2FA ativada'
                content={<Tag color={otpActive ? 'success' : 'error'}>{otpActive ? 'SIM' : 'NÃO'}</Tag>}
              />
            </div>

            <div className='mt'></div>

            <div className='row-start'>
              <TextInfo
                title='Cliente OCEL'
                content={<Tag color={isOcel ? 'success' : 'error'}>{isOcel ? 'SIM' : 'NÃO'}</Tag>}
              />
              {loadingOcel ? <Spin /> : <Switch checked={isOcel} onChange={handleChangeOcel} />}
            </div>

            <div className='mt'></div>

            <div>
              <TextInfo
                title='Consultor'
                content={<Tag color={consultant ? 'success' : 'error'}>{consultant || 'Não tem'}</Tag>}
              />
              <div className='mt'></div>

              <AssignConsultant clientId={client?.id} handleCompleteConsultant={handleCompleteConsultant} />
            </div>

            <div className='mt'></div>

            <ResetPasswordButton clientId={client?.id || ''} />
          </Col>
        ) : null}
      </Row>
      <div className='mt'></div>

      <Tabs onChange={value => setTabs(value)} type='card' activeKey={tabs}>
        <TabPane tab='Contratos' key='deposits'>
          <DepositList client={client} />
        </TabPane>
        {user?.roles?.includes(RoleEnum.ADMIN_FULL) ? (
          <Fragment>
            <TabPane tab='Endereços' key='addresses'>
              <Addresses clientId={client.id} />
            </TabPane>
            <TabPane tab='Uploads' key='uploads'>
              <Uploads clientId={client.id} />
            </TabPane>
          </Fragment>
        ) : null}
      </Tabs>
    </div>
  );
});

export default ClientDetails;
