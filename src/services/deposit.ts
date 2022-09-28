import { EnCurrency } from 'interfaces/currency';
import {
  ICreateDeposit,
  IDepositEventList,
  IDepositList,
  IEventsCloseToExecute,
  IGeneratePayment,
  IProcessEvent,
  IUpdateEvent
} from 'interfaces/deposit';

import apiService, { ApiService } from './api';

export class DepositService {
  constructor(private apiService: ApiService) {
    this.apiService = apiService;
  }

  public getDepositsTotalByCurrency(currency: EnCurrency) {
    return this.apiService.get<number>('admin/deposits/total', { currency });
  }

  public getDepositFrozenByCurrency(currency: EnCurrency) {
    return this.apiService.get<number>('admin/deposits/frozen', { currency });
  }
  public getDepositUnfrozenByCurrency(currency: EnCurrency) {
    return this.apiService.get<number>('admin/deposits/unfrozen', { currency });
  }

  public getDepositFrozenToPayByCurrency(currency: EnCurrency) {
    return this.apiService.get<number>('admin/deposits/frozen-to-pay', { currency });
  }

  public getDeposits(clientId: string) {
    return this.apiService.get<IDepositList[]>(`admin/deposits/${clientId}`);
  }

  public getDepositsEvents(depositId: string) {
    return this.apiService.get<IDepositEventList[]>(`admin/deposits-events/${depositId}`);
  }

  public generateDepositEvents(depositId: string) {
    return this.apiService.post('admin/deposits-events/', { depositId });
  }

  public updateDepositEvents(eventId: string, model: IUpdateEvent) {
    return this.apiService.patch(`admin/deposits-events/${eventId}`, { ...model });
  }

  public updateDeposit(depositId: string, model: IUpdateEvent) {
    return this.apiService.patch(`admin/deposits/${depositId}`, { ...model });
  }

  public createDeposit(model: ICreateDeposit) {
    const { startAt, endAt } = model;

    const data = {
      ...model,
      startAt: startAt.format('YYYY-MM-DD'),
      endAt: endAt.format('YYYY-MM-DD')
    };

    return this.apiService.post('admin/deposits', data);
  }

  public generatePayment(model: IGeneratePayment, depositId: string) {
    const month = model.month.length < 2 ? `0${model.month}` : model.month;
    const date = `${model.year}-${month}-01`;

    return this.apiService.post('admin/generate-payment', { amount: model.amount, depositId, date });
  }

  public getSumBalanceByClientIdAndDepositId(clientId: string, depositId: string) {
    return this.apiService.get<number>(`admin/deposits/${depositId}/balance`, { clientId });
  }

  public terminateDeposit(depositId: string) {
    return this.apiService.patch(`admin/terminate-deposit/${depositId}`, {});
  }

  public processDepositEvents(model: IProcessEvent) {
    return this.apiService.post('admin/process-event', { ...model });
  }

  public getEventsCloseToExecute() {
    return this.apiService.get<IEventsCloseToExecute[]>('admin/events-close-to-expire');
  }
}

const depositService = new DepositService(apiService);
export default depositService;
