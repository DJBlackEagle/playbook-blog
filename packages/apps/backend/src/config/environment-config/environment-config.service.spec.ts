import { ConfigService } from '@nestjs/config';
import { EnvironmentConfigVariables } from './environment-config.constants';
import { EnvironmentConfigService } from './environment-config.service';

/**
 * Unit tests for EnvironmentConfigService.
 */
describe('EnvironmentConfigService', () => {
  let configService: ConfigService;
  let service: EnvironmentConfigService;

  beforeEach(() => {
    configService = {
      get: jest.fn(),
    } as unknown as ConfigService;
    service = new EnvironmentConfigService(configService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('database', () => {
    describe('url', () => {
      it('should return url from config', () => {
        (configService.get as unknown as jest.Mock).mockReturnValue(
          EnvironmentConfigVariables.DATABASE.URL.DEFAULT_VALUE,
        );
        expect(service.database.url()).toBe(
          EnvironmentConfigVariables.DATABASE.URL.DEFAULT_VALUE,
        );
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(configService.get as unknown as jest.Mock).toHaveBeenCalledWith(
          EnvironmentConfigVariables.DATABASE.URL.NAME,
          EnvironmentConfigVariables.DATABASE.URL.DEFAULT_VALUE,
        );
      });

      it('should return default url if not set', () => {
        (configService.get as unknown as jest.Mock).mockImplementation(
          (_key: string, defaultValue: any): any => defaultValue,
        );
        expect(service.database.url()).toBe(
          EnvironmentConfigVariables.DATABASE.URL.DEFAULT_VALUE,
        );
      });
    });
  });

  describe('encryption', () => {
    describe('argon2', () => {
      describe('time', () => {
        it('should return time from config', () => {
          (configService.get as unknown as jest.Mock).mockReturnValue(
            EnvironmentConfigVariables.ENCRYPTION.ARGON2.TIME.DEFAULT_VALUE,
          );
          expect(service.encryption.argon2.time()).toBe(
            EnvironmentConfigVariables.ENCRYPTION.ARGON2.TIME.DEFAULT_VALUE,
          );

          expect(
            // eslint-disable-next-line @typescript-eslint/unbound-method
            configService.get as unknown as jest.Mock,
          ).toHaveBeenCalledWith(
            EnvironmentConfigVariables.ENCRYPTION.ARGON2.TIME.NAME,
            EnvironmentConfigVariables.ENCRYPTION.ARGON2.TIME.DEFAULT_VALUE,
          );
        });

        it('should return default time if not set', () => {
          (configService.get as unknown as jest.Mock).mockImplementation(
            (_key: string, defaultValue: any): any => defaultValue,
          );
          expect(service.encryption.argon2.time()).toBe(
            EnvironmentConfigVariables.ENCRYPTION.ARGON2.TIME.DEFAULT_VALUE,
          );
        });
      });

      describe('memory', () => {
        it('should return memory from config', () => {
          (configService.get as unknown as jest.Mock).mockReturnValue(
            EnvironmentConfigVariables.ENCRYPTION.ARGON2.MEMORY.DEFAULT_VALUE,
          );
          expect(service.encryption.argon2.memory()).toBe(
            EnvironmentConfigVariables.ENCRYPTION.ARGON2.MEMORY.DEFAULT_VALUE,
          );

          expect(
            // eslint-disable-next-line @typescript-eslint/unbound-method
            configService.get as unknown as jest.Mock,
          ).toHaveBeenCalledWith(
            EnvironmentConfigVariables.ENCRYPTION.ARGON2.MEMORY.NAME,
            EnvironmentConfigVariables.ENCRYPTION.ARGON2.MEMORY.DEFAULT_VALUE,
          );
        });

        it('should return default memory if not set', () => {
          (configService.get as unknown as jest.Mock).mockImplementation(
            (_key: string, defaultValue: any): any => defaultValue,
          );
          expect(service.encryption.argon2.memory()).toBe(
            EnvironmentConfigVariables.ENCRYPTION.ARGON2.MEMORY.DEFAULT_VALUE,
          );
        });
      });

      describe('parallelism', () => {
        it('should return parallelism from config', () => {
          (configService.get as unknown as jest.Mock).mockReturnValue(
            EnvironmentConfigVariables.ENCRYPTION.ARGON2.PARALLELISM
              .DEFAULT_VALUE,
          );
          expect(service.encryption.argon2.parallelism()).toBe(
            EnvironmentConfigVariables.ENCRYPTION.ARGON2.PARALLELISM
              .DEFAULT_VALUE,
          );

          expect(
            // eslint-disable-next-line @typescript-eslint/unbound-method
            configService.get as unknown as jest.Mock,
          ).toHaveBeenCalledWith(
            EnvironmentConfigVariables.ENCRYPTION.ARGON2.PARALLELISM.NAME,
            EnvironmentConfigVariables.ENCRYPTION.ARGON2.PARALLELISM
              .DEFAULT_VALUE,
          );
        });

        it('should return default parallelism if not set', () => {
          (configService.get as unknown as jest.Mock).mockImplementation(
            (_key: string, defaultValue: any): any => defaultValue,
          );
          expect(service.encryption.argon2.parallelism()).toBe(
            EnvironmentConfigVariables.ENCRYPTION.ARGON2.PARALLELISM
              .DEFAULT_VALUE,
          );
        });
      });
    });

    describe('pepper', () => {
      it('should return pepper from config', () => {
        (configService.get as unknown as jest.Mock).mockReturnValue(
          EnvironmentConfigVariables.ENCRYPTION.PEPPER.DEFAULT_VALUE,
        );
        expect(service.encryption.pepper()).toBe(
          EnvironmentConfigVariables.ENCRYPTION.PEPPER.DEFAULT_VALUE,
        );
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(configService.get as unknown as jest.Mock).toHaveBeenCalledWith(
          EnvironmentConfigVariables.ENCRYPTION.PEPPER.NAME,
          EnvironmentConfigVariables.ENCRYPTION.PEPPER.DEFAULT_VALUE,
        );
      });

      it('should return default pepper if not set', () => {
        (configService.get as unknown as jest.Mock).mockImplementation(
          (_key: string, defaultValue: any): any => defaultValue,
        );
        expect(service.encryption.pepper()).toBe(
          EnvironmentConfigVariables.ENCRYPTION.PEPPER.DEFAULT_VALUE,
        );
      });
    });
  });

  describe('jwt', () => {
    describe('issuer', () => {
      it('should return issuer from config', () => {
        (configService.get as unknown as jest.Mock).mockReturnValue(
          EnvironmentConfigVariables.JWT.ISSUER.DEFAULT_VALUE,
        );
        expect(service.jwt.issuer()).toBe(
          EnvironmentConfigVariables.JWT.ISSUER.DEFAULT_VALUE,
        );
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(configService.get as unknown as jest.Mock).toHaveBeenCalledWith(
          EnvironmentConfigVariables.JWT.ISSUER.NAME,
          EnvironmentConfigVariables.JWT.ISSUER.DEFAULT_VALUE,
        );
      });

      it('should return default issuer if not set', () => {
        (configService.get as unknown as jest.Mock).mockImplementation(
          (_key: string, defaultValue: any): any => defaultValue,
        );
        expect(service.jwt.issuer()).toBe(
          EnvironmentConfigVariables.JWT.ISSUER.DEFAULT_VALUE,
        );
      });
    });

    describe('audience', () => {
      it('should return audience from config', () => {
        (configService.get as unknown as jest.Mock).mockReturnValue(
          EnvironmentConfigVariables.JWT.AUDIENCE.DEFAULT_VALUE,
        );
        expect(service.jwt.audience()).toBe(
          EnvironmentConfigVariables.JWT.AUDIENCE.DEFAULT_VALUE,
        );
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(configService.get as unknown as jest.Mock).toHaveBeenCalledWith(
          EnvironmentConfigVariables.JWT.AUDIENCE.NAME,
          EnvironmentConfigVariables.JWT.AUDIENCE.DEFAULT_VALUE,
        );
      });

      it('should return default audience if not set', () => {
        (configService.get as unknown as jest.Mock).mockImplementation(
          (_key: string, defaultValue: any): any => defaultValue,
        );
        expect(service.jwt.audience()).toBe(
          EnvironmentConfigVariables.JWT.AUDIENCE.DEFAULT_VALUE,
        );
      });
    });

    describe('token', () => {
      describe('secret', () => {
        it('should return secret from config', () => {
          (configService.get as unknown as jest.Mock).mockReturnValue(
            EnvironmentConfigVariables.JWT.TOKEN.SECRET.DEFAULT_VALUE,
          );
          expect(service.jwt.token.secret()).toBe(
            EnvironmentConfigVariables.JWT.TOKEN.SECRET.DEFAULT_VALUE,
          );

          expect(
            // eslint-disable-next-line @typescript-eslint/unbound-method
            configService.get as unknown as jest.Mock,
          ).toHaveBeenCalledWith(
            EnvironmentConfigVariables.JWT.TOKEN.SECRET.NAME,
            EnvironmentConfigVariables.JWT.TOKEN.SECRET.DEFAULT_VALUE,
          );
        });

        it('should return default secret if not set', () => {
          (configService.get as unknown as jest.Mock).mockImplementation(
            (_key: string, defaultValue: any): any => defaultValue,
          );
          expect(service.jwt.token.secret()).toBe(
            EnvironmentConfigVariables.JWT.TOKEN.SECRET.DEFAULT_VALUE,
          );
        });
      });

      describe('expiresIn', () => {
        it('should return expiresIn from config', () => {
          (configService.get as unknown as jest.Mock).mockReturnValue(
            EnvironmentConfigVariables.JWT.TOKEN.EXPIRES_IN.DEFAULT_VALUE,
          );
          expect(service.jwt.token.expiresIn()).toBe(
            EnvironmentConfigVariables.JWT.TOKEN.EXPIRES_IN.DEFAULT_VALUE,
          );

          expect(
            // eslint-disable-next-line @typescript-eslint/unbound-method
            configService.get as unknown as jest.Mock,
          ).toHaveBeenCalledWith(
            EnvironmentConfigVariables.JWT.TOKEN.EXPIRES_IN.NAME,
            EnvironmentConfigVariables.JWT.TOKEN.EXPIRES_IN.DEFAULT_VALUE,
          );
        });

        it('should return default expiresIn if not set', () => {
          (configService.get as unknown as jest.Mock).mockImplementation(
            (_key: string, defaultValue: any): any => defaultValue,
          );
          expect(service.jwt.token.expiresIn()).toBe(
            EnvironmentConfigVariables.JWT.TOKEN.EXPIRES_IN.DEFAULT_VALUE,
          );
        });
      });
    });

    describe('refresh', () => {
      describe('secret', () => {
        it('should return secret from config', () => {
          (configService.get as unknown as jest.Mock).mockReturnValue(
            EnvironmentConfigVariables.JWT.REFRESH.SECRET.DEFAULT_VALUE,
          );
          expect(service.jwt.refresh.secret()).toBe(
            EnvironmentConfigVariables.JWT.REFRESH.SECRET.DEFAULT_VALUE,
          );

          expect(
            // eslint-disable-next-line @typescript-eslint/unbound-method
            configService.get as unknown as jest.Mock,
          ).toHaveBeenCalledWith(
            EnvironmentConfigVariables.JWT.REFRESH.SECRET.NAME,
            EnvironmentConfigVariables.JWT.REFRESH.SECRET.DEFAULT_VALUE,
          );
        });

        it('should return default secret if not set', () => {
          (configService.get as unknown as jest.Mock).mockImplementation(
            (_key: string, defaultValue: any): any => defaultValue,
          );
          expect(service.jwt.refresh.secret()).toBe(
            EnvironmentConfigVariables.JWT.REFRESH.SECRET.DEFAULT_VALUE,
          );
        });
      });

      describe('expiresIn', () => {
        it('should return expiresIn from config', () => {
          (configService.get as unknown as jest.Mock).mockReturnValue(
            EnvironmentConfigVariables.JWT.REFRESH.EXPIRES_IN.DEFAULT_VALUE,
          );
          expect(service.jwt.refresh.expiresIn()).toBe(
            EnvironmentConfigVariables.JWT.REFRESH.EXPIRES_IN.DEFAULT_VALUE,
          );

          expect(
            // eslint-disable-next-line @typescript-eslint/unbound-method
            configService.get as unknown as jest.Mock,
          ).toHaveBeenCalledWith(
            EnvironmentConfigVariables.JWT.REFRESH.EXPIRES_IN.NAME,
            EnvironmentConfigVariables.JWT.REFRESH.EXPIRES_IN.DEFAULT_VALUE,
          );
        });

        it('should return default expiresIn if not set', () => {
          (configService.get as unknown as jest.Mock).mockImplementation(
            (_key: string, defaultValue: any): any => defaultValue,
          );
          expect(service.jwt.refresh.expiresIn()).toBe(
            EnvironmentConfigVariables.JWT.REFRESH.EXPIRES_IN.DEFAULT_VALUE,
          );
        });
      });
    });
  });
});
