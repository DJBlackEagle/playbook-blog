import { Logger } from '@nestjs/common';

const loggerMethods: Array<'error' | 'warn' | 'log' | 'debug' | 'verbose'> = [
  'error',
  'warn',
  'log',
  'debug',
  'verbose',
];

loggerMethods.forEach((method) => {
  jest.spyOn(Logger, method).mockImplementation(() => {});
  jest.spyOn(Logger.prototype, method).mockImplementation(() => {});
});

jest.spyOn(console, 'error').mockImplementation(() => {});
jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(console, 'log').mockImplementation(() => {});
