/* eslint-disable @typescript-eslint/unbound-method */
import * as path from 'path';
import { FileResolver } from './file-resolver.util';
import { PathResolver } from './path-resolver.util';

jest.mock('path');
jest.mock('./path-resolver.util');

describe('FileResolver', () => {
  const mockedPath = path as jest.Mocked<typeof path>;
  const mockedPathResolver = PathResolver as jest.Mocked<typeof PathResolver>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getEnvFile', () => {
    it('should resolve the .env file path using PathResolver and path.resolve', () => {
      mockedPathResolver.getRootPath.mockReturnValue('/root');
      mockedPath.resolve.mockReturnValue('/root/.env');

      const result = FileResolver.getEnvFile();

      expect(mockedPathResolver.getRootPath).toHaveBeenCalled();
      const resolveMock = mockedPath.resolve as jest.Mock;

      expect(resolveMock).toHaveBeenCalledWith('/root', '.env');
      expect(result).toBe('/root/.env');
    });
  });

  describe('getConfigFile', () => {
    it('should resolve the config file path using PathResolver and path.resolve', () => {
      mockedPathResolver.getConfigPath.mockReturnValue('/root/config');
      mockedPath.resolve.mockReturnValue('/root/config/app.yaml');

      const result = FileResolver.getConfigFile('app.yaml');
      const getConfigPathMock = mockedPathResolver.getConfigPath as jest.Mock;
      const resolveMock = mockedPath.resolve as jest.Mock;

      expect(getConfigPathMock).toHaveBeenCalled();
      expect(resolveMock).toHaveBeenCalledWith('/root/config', 'app.yaml');
      expect(result).toBe('/root/config/app.yaml');
    });
  });
});
