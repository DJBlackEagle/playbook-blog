/**
 * Utility class for calculating dates by adding or subtracting one or more time durations.
 *
 * @example
 *   DateCalc.add(['2h', '30m']); // Returns a Date 2 hours and 30 minutes from now
 *   DateCalc.subtract(['1d', '2h'], new Date('2025-01-01')); // Returns a Date 1 day and 2 hours before the given date
 */
export class DateCalc {
  /**
   * Calculates the date in the future by adding one or more duration strings from a given date.
   *
   * Supported units:
   *   - s: seconds
   *   - m: minutes
   *   - h: hours
   *   - d: days
   *   - w: weeks
   *   - M: months (calendar months)
   *   - y: years (365 days per year)
   *
   * @param durations - The duration string or array of strings (e.g., '2h', ['30m', '1d']).
   * @param fromDate - The base date (default: now).
   * @returns The expiration Date.
   *
   * @throws {Error} If any duration format is invalid or the time unit is unsupported.
   *
   * @example
   *   DateCalc.add(['2h', '30m']); // 2 hours and 30 minutes from now
   *   DateCalc.add('1d', new Date('2025-01-01')); // 1 day from given date
   */
  static add(durations: string | string[], fromDate: Date = new Date()): Date {
    const arr = Array.isArray(durations) ? durations : [durations];
    let result = new Date(fromDate);

    for (const duration of arr) {
      const match = /^(\d+(?:\.\d+)?)([smhdwyM])$/.exec(duration);
      if (!match)
        throw new Error(
          'Invalid duration format. Use e.g. "2h", "30m", "15s", "1d", "3w", "2y", "1M".',
        );

      const value = parseFloat(match[1]);
      const unit = match[2];

      switch (unit) {
        case 's':
          result = new Date(result.getTime() + value * 1000);
          break;
        case 'm':
          result = new Date(result.getTime() + value * 60 * 1000);
          break;
        case 'h':
          result = new Date(result.getTime() + value * 60 * 60 * 1000);
          break;
        case 'd':
          result = new Date(result.getTime() + value * 24 * 60 * 60 * 1000);
          break;
        case 'w':
          result = new Date(result.getTime() + value * 7 * 24 * 60 * 60 * 1000);
          break;
        case 'y': {
          const date = new Date(result);
          date.setFullYear(date.getFullYear() + value);
          result = date;
          break;
        }
        case 'M': {
          const date = new Date(result);
          date.setMonth(date.getMonth() + value);
          result = date;
          break;
        }
      }
    }
    return result;
  }

  /**
   * Calculates the date in the past by subtracting one or more duration strings from a given date.
   *
   * Supported units:
   *   - s: seconds
   *   - m: minutes
   *   - h: hours
   *   - d: days
   *   - w: weeks
   *   - M: months (calendar months)
   *   - y: years (calendar years)
   *
   * @param durations - The duration string or array of strings (e.g., '2h', ['30m', '1d']).
   * @param fromDate - The base date (default: now).
   * @returns The expired Date.
   *
   * @throws {Error} If any duration format is invalid or the time unit is unsupported.
   *
   * @example
   *   DateCalc.subtract(['2h', '30m']); // 2 hours and 30 minutes ago from now
   *   DateCalc.subtract('1d', new Date('2025-01-01')); // 1 day before given date
   */
  static subtract(
    durations: string | string[],
    fromDate: Date = new Date(),
  ): Date {
    const arr = Array.isArray(durations) ? durations : [durations];
    let result = new Date(fromDate);

    for (const duration of arr) {
      const match = /^(\d+(?:\.\d+)?)([smhdwyM])$/.exec(duration);
      if (!match)
        throw new Error(
          'Invalid duration format. Use e.g. "2h", "30m", "15s", "1d", "3w", "2y", "1M".',
        );

      const value = parseFloat(match[1]);
      const unit = match[2];

      switch (unit) {
        case 's':
          result = new Date(result.getTime() - value * 1000);
          break;
        case 'm':
          result = new Date(result.getTime() - value * 60 * 1000);
          break;
        case 'h':
          result = new Date(result.getTime() - value * 60 * 60 * 1000);
          break;
        case 'd':
          result = new Date(result.getTime() - value * 24 * 60 * 60 * 1000);
          break;
        case 'w':
          result = new Date(result.getTime() - value * 7 * 24 * 60 * 60 * 1000);
          break;
        case 'y': {
          const date = new Date(result);
          date.setFullYear(date.getFullYear() - value);
          result = date;
          break;
        }
        case 'M': {
          const date = new Date(result);
          date.setMonth(date.getMonth() - value);
          result = date;
          break;
        }
      }
    }
    return result;
  }
}
