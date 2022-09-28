import { Button, Divider, Table, Tag, Typography } from 'antd';
import Column from 'antd/lib/table/Column';
import { addOneDayAndFormat } from 'facades/date';
import { displayDepositStatusColor, formatDepositStatus } from 'facades/formatStatus';
import { formatCurrency } from 'facades/money';
import useFetch from 'hooks/useFetch';
import { IClientList } from 'interfaces/client';
import { EnCurrency } from 'interfaces/currency';
import { EnDepositStatus, IDepositList } from 'interfaces/deposit';
import { Fragment, memo, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import depositService from 'services/deposit';
import { depositListState } from 'states/depositListState';

import { ChangeDepositReturnButton } from './ChangeDepositReturn';
import { CreateNewDeposit } from './CreateNewDeposit';
import DepositDetails from './DepositDetails';
import { GeneratePaymentButton } from './GeneratePayment';
import { CancelDepositButton } from './TerminateDeposit';

const { Title } = Typography;

interface IProps {
  client: IClientList;
}

export const DepositList = memo(({ client }: IProps) => {
  const { data, loading, fetchData } = useFetch(() => depositService.getDeposits(client.id), []);
  const [shouldUpdateList, setShouldUpdateList] = useRecoilState(depositListState);
  const [deposit, setDeposit] = useState<IDepositList>(null);

  const depositDetailsVisible = useMemo(() => !!deposit, [deposit]);

  const balanceBtcTotal = useMemo(() => {
    if (!data?.length) {
      return 0;
    }

    return data.reduce((acc, curr) => {
      if (curr.currency === EnCurrency.BTC && curr.status !== EnDepositStatus.TERMINATED) {
        return acc + curr.total;
      }

      return acc;
    }, 0);
  }, [data]);

  useEffect(() => {
    if (shouldUpdateList) {
      fetchData();
      setShouldUpdateList(false);
    }
  }, [shouldUpdateList, setShouldUpdateList, fetchData]);

  return (
    <Fragment>
      <CreateNewDeposit clientId={client.id} onComplete={fetchData} />

      <div className='mt'></div>

      {depositDetailsVisible ? (
        <DepositDetails
          deposit={deposit}
          clientId={client.id}
          handleCancel={() => setDeposit(null)}
          visible={depositDetailsVisible}
        />
      ) : (
        <Fragment>
          <Divider>Contratos</Divider>
          <Title level={5}>Saldo total dos contratos:</Title>
          <Tag color='success' style={{ fontSize: 15 }}>
            {deposit?.currency || ''} {formatCurrency(balanceBtcTotal ?? 0, 8)}
          </Tag>

          <div className='mt' />

          <Table rowKey='id' loading={loading} dataSource={loading ? [] : data}>
            <Column
              title='Data de Inicio'
              dataIndex='confirmedAt'
              render={(val: string) => (val ? <span>{addOneDayAndFormat(val)}</span> : '-')}
            />
            <Column
              title='Status'
              className='hide-on-responsive'
              dataIndex='status'
              render={(val: EnDepositStatus) => (
                <Tag color={displayDepositStatusColor(val)}>{formatDepositStatus(val)}</Tag>
              )}
            />
            <Column
              title='Saldo Inicial'
              className='hide-on-responsive'
              dataIndex='amount'
              render={(val: number, item: IDepositList) => (
                <span>
                  {item.currency} {formatCurrency(val, 8)}
                </span>
              )}
            />
            {client.isOcel && (
              <Column
                title='Saldo Congelado'
                dataIndex='frozenAmount'
                render={(val: number, item: IDepositList) => (
                  <span>
                    {item.currency} {formatCurrency(val, 8)}
                  </span>
                )}
              />
            )}
            <Column
              title='Saldo Atualizado'
              dataIndex='total'
              render={(val: number, item: IDepositList) => (
                <span>
                  {item.currency} {formatCurrency(val, 8)}
                </span>
              )}
            />
            <Column
              title='Retorno Fixo'
              className='hide-on-responsive'
              dataIndex='monthlyReturn'
              render={(val: number) => (Number.isFinite(val) ? <span>{formatCurrency(val)}%</span> : '-')}
            />
            <Column
              title='#'
              dataIndex='action'
              render={(_, record: IDepositList) => {
                if (record.status === EnDepositStatus.TERMINATED) {
                  return (
                    <Button onClick={() => setDeposit(record)} type='dashed'>
                      Detalhes
                    </Button>
                  );
                }

                if (record.status === EnDepositStatus.FROZEN) {
                  return (
                    <div>
                      <CancelDepositButton depositId={record.id} onComplete={fetchData} />

                      <div className='mt'></div>

                      <GeneratePaymentButton deposit={record} onComplete={fetchData} />

                      <div className='mt'></div>

                      <Button onClick={() => setDeposit(record)} type='dashed'>
                        Detalhes
                      </Button>
                    </div>
                  );
                }

                return (
                  <div>
                    <CancelDepositButton depositId={record.id} onComplete={fetchData} />

                    <div className='mt'></div>

                    <Button onClick={() => setDeposit(record)} type='dashed'>
                      Detalhes
                    </Button>

                    <div className='mt'></div>

                    <ChangeDepositReturnButton deposit={record} onComplete={fetchData} />
                  </div>
                );
              }}
            />
          </Table>
        </Fragment>
      )}
    </Fragment>
  );
});
