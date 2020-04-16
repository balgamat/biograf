export const formatDuration = (t: number): string => {
  let units = {
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  };

  if (t > 0) {
    units = {
      d: Math.floor(t / (1000 * 60 * 60 * 24)),
      h: Math.floor((t / (1000 * 60 * 60)) % 24),
      m: Math.floor((t / 1000 / 60) % 60),
      s: Math.floor((t / 1000) % 60),
    };
  }

  const toString = (unit: 'd' | 'h' | 'm' | 's') =>
    !!units[unit] || unit !== 'd'
      ? `${units[unit].toString().padStart(2, '0')}${unit !== 's' ? ':' : ''}`
      : '';

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const result = Object.keys(units).map(toString).join('');

  return t < 3_600_000 ? result.slice(-5) : result;
};
