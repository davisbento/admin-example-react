export const formatCurrency = (value: number, digits = 2) => {
  const options = {};
  const intl = new Intl.NumberFormat('en-US', { minimumFractionDigits: digits, ...options });
  return intl.format(value);
};
