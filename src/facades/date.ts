import addDays from 'date-fns/addDays';
import dateFnsFormat from 'date-fns/format';
import dateFnsIsValid from 'date-fns/isValid';
import locale from 'date-fns/locale/pt-BR';
import dateFnsParse from 'date-fns/parse';
import startOfDay from 'date-fns/startOfDay';

export function dateParse(value: any, format: string = null): Date {
  if (!value) return value;
  if (typeof value !== 'string') return value;

  value = value.replace(/\+.+/gi, '').replace(/\..+$/gi, '');
  const date = !format ? new Date(value) : dateFnsParse(value, format, new Date(), { locale });
  if (!dateFnsIsValid(date)) return value;

  return date;
}

export function dateFormat(date: string, format: string = 'dd/MM/yyyy'): string {
  return dateFnsFormat(new Date(date), format, { locale });
}

export function addOneDayAndFormat(date: string, format: string = 'dd/MM/yyyy'): string {
  const dateMoreOneDay = addDays(new Date(date), 1);
  return dateFnsFormat(new Date(dateMoreOneDay), format, { locale });
}
export const getToday = () => startOfDay(new Date());

export const isDateBeforeToday = (date: Date) => {
  const today = getToday();
  return date.getTime() < today.getTime();
};
