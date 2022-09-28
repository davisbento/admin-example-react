import moment from 'moment';

import { EnCurrency } from './currency';

export enum EnDepositStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  FROZEN = 'FROZEN',
  TERMINATED = 'TERMINATED'
}
export enum EnDepositEventStatus {
  WAITING = 'WAITING',
  EXECUTED = 'EXECUTED',
  TERMINATED = 'TERMINATED'
}

export interface IDepositList {
  id: string;
  currency: EnCurrency;
  username?: string;
  amount: number;
  frozenAmount: number;
  total: number;
  status: EnDepositStatus;
  monthlyReturn: number;
  confirmedAt: string;
  createdAt: string;
  endAt: string;
}
export interface IDepositEventList {
  id: string;
  dayToExecute: number;
  status: EnDepositEventStatus;
  monthlyReturn: number;
  dateToExecute: string;
  balanceCalculated: number;
  percentUsedToCalculate: number;
}

export interface IProcessEventList {
  id: string;
  status: EnDepositEventStatus;
  dateToExecute: string;
}

export interface IUpdateEvent {
  monthlyReturn: number;
}

export interface IProcessEvent {
  eventId: string;
}

export interface ICreateDeposit {
  currency: EnCurrency;
  amount: number;
  clientId: string;
  endAt: moment.Moment;
  startAt: moment.Moment;
  txId: string;
}

export interface IGeneratePayment {
  amount: number;
  percent: number;
  month: string;
  year: string;
}
export interface IEventsCloseToExecute {
  clientName: string;
  consultant: string;
  dateToExecute: string;
  currency: string;
  id: string;
  total: number;
}
