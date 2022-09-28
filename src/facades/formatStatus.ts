import { EnDepositEventStatus, EnDepositStatus } from 'interfaces/deposit';

export const nameCapitalized = (value: string) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

export const formatDepositStatus = (status: EnDepositStatus) => {
  switch (status) {
    case EnDepositStatus.PENDING:
      return 'Pendente';
    case EnDepositStatus.CONFIRMED:
      return 'Confirmado';
    case EnDepositStatus.FROZEN:
      return 'Congelado';
    case EnDepositStatus.TERMINATED:
      return 'Encerrado';
    default:
      return 'Unknown';
  }
};

export const formatDepositEventStatus = (status: EnDepositEventStatus) => {
  switch (status) {
    case EnDepositEventStatus.WAITING:
      return 'Aguardando';
    case EnDepositEventStatus.EXECUTED:
      return 'Confirmado';
    case EnDepositEventStatus.TERMINATED:
      return 'Encerrado';
    default:
      return 'Unknown';
  }
};

export const displayDepositEventStatusColor = (status: EnDepositEventStatus) => {
  if (status === EnDepositEventStatus.EXECUTED) {
    return 'success';
  }

  if (status === EnDepositEventStatus.WAITING) return 'gold';
  if (status === EnDepositEventStatus.TERMINATED) {
    return 'red';
  }

  return 'default';
};

export const displayDepositStatusColor = (status: EnDepositStatus) => {
  if (status === EnDepositStatus.CONFIRMED) {
    return 'success';
  }

  if (status === EnDepositStatus.PENDING) return 'gold';

  if (status === EnDepositStatus.FROZEN) {
    return 'blue';
  }

  if (status === EnDepositStatus.TERMINATED) {
    return 'red';
  }

  return 'default';
};
