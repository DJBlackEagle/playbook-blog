import { DateCalc } from './date-calc.util';

describe('DateCalc', () => {
  const baseDate = new Date('2025-01-01T00:00:00Z');

  it('should add seconds', () => {
    const result = DateCalc.add('10s', baseDate);
    expect(result.getTime()).toBe(baseDate.getTime() + 10 * 1000);
  });

  it('should add minutes', () => {
    const result = DateCalc.add('5m', baseDate);
    expect(result.getTime()).toBe(baseDate.getTime() + 5 * 60 * 1000);
  });

  it('should add hours', () => {
    const result = DateCalc.add('2h', baseDate);
    expect(result.getTime()).toBe(baseDate.getTime() + 2 * 60 * 60 * 1000);
  });

  it('should add days', () => {
    const result = DateCalc.add('3d', baseDate);
    expect(result.getTime()).toBe(baseDate.getTime() + 3 * 24 * 60 * 60 * 1000);
  });

  it('should add weeks', () => {
    const result = DateCalc.add('1w', baseDate);
    expect(result.getTime()).toBe(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  });

  it('should add months (calendar months)', () => {
    const date = new Date('2025-01-31T00:00:00Z');
    const result = DateCalc.add('1M', date);
    // Adding 1 month to Jan 31, 2025 results in March 3, 2025 (overflow)
    expect(result.getMonth()).toBe(2); // March
    expect(result.getDate()).toBe(3); // 3rd
  });

  it('should add years (calendar years)', () => {
    const date = new Date('2024-02-29T00:00:00Z');
    const result = DateCalc.add('1y', date);
    // Adding 1 year to Feb 29, 2024 results in March 1, 2025 (JS overflow)
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(2); // March
    expect(result.getDate()).toBe(1); // 1st
  });

  it('should add decimal durations', () => {
    const result = DateCalc.add('1.5h', baseDate);
    expect(result.getTime()).toBe(baseDate.getTime() + 1.5 * 60 * 60 * 1000);
  });

  it('should add array of durations', () => {
    const result = DateCalc.add(['1h', '30m'], baseDate);
    expect(result.getTime()).toBe(
      baseDate.getTime() + (1 * 60 * 60 * 1000 + 30 * 60 * 1000),
    );
  });

  it('should subtract seconds', () => {
    const result = DateCalc.subtract('10s', baseDate);
    expect(result.getTime()).toBe(baseDate.getTime() - 10 * 1000);
  });

  it('should subtract minutes', () => {
    const result = DateCalc.subtract('5m', baseDate);
    expect(result.getTime()).toBe(baseDate.getTime() - 5 * 60 * 1000);
  });

  it('should subtract hours', () => {
    const result = DateCalc.subtract('2h', baseDate);
    expect(result.getTime()).toBe(baseDate.getTime() - 2 * 60 * 60 * 1000);
  });

  it('should subtract days', () => {
    const result = DateCalc.subtract('3d', baseDate);
    expect(result.getTime()).toBe(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000);
  });

  it('should subtract weeks', () => {
    const result = DateCalc.subtract('1w', baseDate);
    expect(result.getTime()).toBe(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  });

  it('should subtract months (calendar months)', () => {
    const date = new Date('2025-03-31T00:00:00Z');
    const result = DateCalc.subtract('1M', date);
    // Subtracting 1 month from Mar 31, 2025 results in March 3, 2025 (JS overflow)
    expect(result.getMonth()).toBe(2); // March
    expect(result.getDate()).toBe(3); // 3rd
  });

  it('should subtract years (calendar years)', () => {
    const date = new Date('2025-02-28T00:00:00Z');
    const result = DateCalc.subtract('1y', date);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(1); // February
  });

  it('should subtract decimal durations', () => {
    const result = DateCalc.subtract('1.5h', baseDate);
    expect(result.getTime()).toBe(baseDate.getTime() - 1.5 * 60 * 60 * 1000);
  });

  it('should subtract array of durations', () => {
    const result = DateCalc.subtract(['1h', '30m'], baseDate);
    expect(result.getTime()).toBe(
      baseDate.getTime() - (1 * 60 * 60 * 1000 + 30 * 60 * 1000),
    );
  });

  it('should throw on invalid format', () => {
    expect(() => DateCalc.add('bad')).toThrow();
    expect(() => DateCalc.subtract('bad')).toThrow();
  });

  it('should throw on unsupported unit', () => {
    expect(() => DateCalc.add('1q')).toThrow('Invalid duration format');
    expect(() => DateCalc.subtract('1q')).toThrow('Invalid duration format');
  });
});
