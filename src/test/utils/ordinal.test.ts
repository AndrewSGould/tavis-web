import { setOrdinal } from '../../utils/ordinal';

describe('setOrdinal', () => {
  it('should return the correct ordinal for 1', () => {
    expect(setOrdinal(1)).toBe('1st');
  });

  it('should return the correct ordinal for 2', () => {
    expect(setOrdinal(2)).toBe('2nd');
  });

  it('should return the correct ordinal for 3', () => {
    expect(setOrdinal(3)).toBe('3rd');
  });

  it('should return the correct ordinal for 4', () => {
    expect(setOrdinal(4)).toBe('4th');
  });

  it('should return the correct ordinal for 11', () => {
    expect(setOrdinal(11)).toBe('11th');
  });

  it('should return the correct ordinal for 12', () => {
    expect(setOrdinal(12)).toBe('12th');
  });

  it('should return the correct ordinal for 13', () => {
    expect(setOrdinal(13)).toBe('13th');
  });

  it('should return the correct ordinal for 21', () => {
    expect(setOrdinal(21)).toBe('21st');
  });

  it('should return the correct ordinal for 22', () => {
    expect(setOrdinal(22)).toBe('22nd');
  });

  it('should return the correct ordinal for 23', () => {
    expect(setOrdinal(23)).toBe('23rd');
  });

  it('should return the correct ordinal for 24', () => {
    expect(setOrdinal(24)).toBe('24th');
  });
});
