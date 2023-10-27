import { dateToString } from '../../utils/date';

describe('dateToString', () => {
  it('should return the correct short date string', () => {
    const date = new Date('2022-01-01T00:00:00');
    const longform = false;
    const includeTime = false;
    const expected = '1/1/22';
    const result = dateToString(date, longform, includeTime);
    expect(result).toBe(expected);
  });

  it('should return the correct long date string', () => {
    const date = new Date('2022-01-01T00:00:00');
    const longform = true;
    const includeTime = false;
    const expected = 'January 1, 2022';
    const result = dateToString(date, longform, includeTime);
    expect(result).toBe(expected);
  });

  it('should return the correct short date and time string', () => {
    const date = new Date('2022-01-01T12:34:56');
    const longform = false;
    const includeTime = true;
    const expected = '1/1/22, 12:34 PM';
    const result = dateToString(date, longform, includeTime);
    expect(result).toBe(expected);
  });

  it('should return the correct long date and time string', () => {
    const date = new Date('2022-01-01T12:34:56');
    const longform = true;
    const includeTime = true;
    const expected = 'January 1, 2022 at 12:34 PM';
    const result = dateToString(date, longform, includeTime);
    expect(result).toBe(expected);
  });
});
