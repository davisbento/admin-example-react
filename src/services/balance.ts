import { EnCurrency } from 'interfaces/currency';

import apiService, { ApiService } from './api';

export class BalanceService {
  constructor(private apiService: ApiService) {
    this.apiService = apiService;
  }

  public getBalanceTotalByCurrency(currency: EnCurrency) {
    return this.apiService.get<number>('admin/balances/total', { currency });
  }

  public simulateValues(eventId: string) {
    return this.apiService
      .get<{ calculatedAmount: number }>(`admin/balances/${eventId}/simulate`)
      .then(({ calculatedAmount }) => calculatedAmount)
      .catch(() => 0);
  }

  public processProfitabilityByEventId(eventId: string) {
    return this.apiService.post(`admin/balances/${eventId}/profitability`, {});
  }

  public processWithdrawalByEventId(eventId: string) {
    return this.apiService.post(`admin/balances/${eventId}/withdrawal`, {});
  }

  public createPartialDeposit(amount: number, clientId: string, depositId: string, currency: EnCurrency) {
    return this.apiService.post('admin/clients/add-balance', { amount, clientId, depositId, currency });
  }
  public deleteBalanceByEventId(depositEventId: string) {
    return this.apiService.del(`admin/balances/${depositEventId}`, {});
  }
}

const balanceService = new BalanceService(apiService);
export default balanceService;
