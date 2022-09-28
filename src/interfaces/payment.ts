import { EnCurrency } from './currency';

export interface IPaymentList {
  confirmedAt: string;
  id: string;
  clientId: string;
  clientName: string;
  currency: EnCurrency;
  amount: number;
  monthRef: string;
  wallets: IWallet[];
}

export interface IPaymentHistoryList {
  paidAt: string;
  id: string;
  clientId: string;
  clientName: string;
  currency: EnCurrency;
  amount: number;
  monthRef: string;
  addressPaid: string;
}

export interface IWallet {
  address: string;
  currency: EnCurrency;
}
