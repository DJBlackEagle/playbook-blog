/* eslint-disable @typescript-eslint/unbound-method */
import * as path from 'path';
import { PathResolver } from './path-resolver.util';

jest.mock('path');

describe('PathResolver', () => {
  const mockedPath = path as jest.Mocked<typeof path>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRootPath', () => {
    it('should resolve the root path using process.cwd and path.resolve', () => {
      const fakeCwd = '/my/cwd';
      const expected = '/my/root';
      jest.spyOn(process, 'cwd').mockReturnValue(fakeCwd);
      mockedPath.resolve.mockReturnValue(expected);

      const result = PathResolver.getRootPath();

      expect(process.cwd).toHaveBeenCalled();
      expect(mockedPath.resolve).toHaveBeenCalledWith(fakeCwd, '../../../');
      expect(result).toBe(expected);
    });
  });

  describe('getConfigPath', () => {
    it('should resolve the config path using getRootPath and path.resolve', () => {
      const rootPath = '/my/root';
      const configPath = '/my/root/config';
      jest.spyOn(PathResolver, 'getRootPath').mockReturnValue(rootPath);
      mockedPath.resolve.mockReturnValue(configPath);

      const result = PathResolver.getConfigPath();

      expect(PathResolver.getRootPath).toHaveBeenCalled();
      expect(mockedPath.resolve).toHaveBeenCalledWith(rootPath, 'config');
      expect(result).toBe(configPath);
    });
  });
});
