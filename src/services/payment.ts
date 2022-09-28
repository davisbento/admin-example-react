import { IPaymentHistoryList, IPaymentList } from 'interfaces/payment';

import apiService, { ApiService } from './api';

export class PaymentService {
  constructor(private apiService: ApiService) {
    this.apiService = apiService;
  }

  public getPaymentsPending() {
    return this.apiService.get<IPaymentList[]>('admin/payments/pending');
  }

  public getPaymentsExecuted() {
    return this.apiService.get<IPaymentHistoryList[]>('admin/payments/executed');
  }

  public confirmPayment(address: string, paymentId: string) {
    return this.apiService.post('admin/payments/confirm', { address, paymentId });
  }
}

const paymentService = new PaymentService(apiService);
export default paymentService;
