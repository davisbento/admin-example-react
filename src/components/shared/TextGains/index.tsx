import { formatCurrency } from 'facades/money';
import { memo, useMemo } from 'react';

interface IProps {
  value: number;
  digits?: number;
  symbolEnd?: string;
}

const TextGains = memo(({ value, digits = 2, symbolEnd }: IProps) => {
  const colorClass = useMemo(() => {
    if (value < 0) return 'negative-gain';

    return 'positive-gain';
  }, [value]);

  const symbolStart = useMemo(() => {
    if (value < 0) return '';

    return '';
  }, [value]);

  return (
    <span className={colorClass}>
      {symbolStart}
      {formatCurrency(value || 0, digits)}
      {symbolEnd || null}
    </span>
  );
});

export default TextGains;
