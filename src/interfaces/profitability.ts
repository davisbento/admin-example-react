import { EnCurrency } from './currency';

export interface IProfitability {
  id: string;
  date: string;
  value: number;
  currency: EnCurrency;
}

export interface ICreateProfitability {
  value: number;
  month: string;
  year: string;
  currency: string;
}
