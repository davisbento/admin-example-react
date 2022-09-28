import { EnCurrency } from './currency';

export interface IClientCreate {
  name: string;
  username: string;
  phone: {
    phone: string;
    code: number;
  };
  password: string;
}

export interface IClientList {
  id: string;
  name: string;
  username: string;
  email: string;
  isOtpActive: boolean;
  isOcel: boolean;
  consultant: string;
  observation: string;
  wallets: { address: string; currency: EnCurrency }[];
}

export interface IAddress {
  street: string;
  city: string;
  country: string;
  state: string;
  postalCode: number;
  number: number;
}

export type eType = 'address' | 'documentation' | 'selfie' | 'documents' | 'wallet' | 'contractSigned';
