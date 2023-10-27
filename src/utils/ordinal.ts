export const setOrdinal = (int: number): string => {
  const ones = +int % 10;
  const tens = (+int % 100) - ones;
  return int + ['th', 'st', 'nd', 'rd'][tens === 10 || ones > 3 ? 0 : ones];
};
