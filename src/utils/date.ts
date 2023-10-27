const dateToString = (
  date: Date,
  longform = false,
  includeTime = false,
): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: longform ? 'numeric' : '2-digit',
    month: longform ? 'long' : 'numeric',
    day: longform ? 'numeric' : 'numeric',
    hour: includeTime ? 'numeric' : undefined,
    minute: includeTime ? 'numeric' : undefined,
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  return formatter.format(date);
};

export { dateToString };
