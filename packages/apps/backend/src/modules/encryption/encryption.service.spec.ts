import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as argon2 from 'argon2';
import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  let service: EncryptionService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EncryptionService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(<T>(key: string, defaultValue: T) => defaultValue),
          },
        },
      ],
    }).compile();

    service = module.get<EncryptionService>(EncryptionService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hash', () => {
    it('should hash a value', async () => {
      const hash = await service.hash('password');

      expect(typeof hash).toBe('string');
      expect(hash.length).toBeGreaterThan(0);
    });

    it('should hash without pepper (empty string)', async () => {
      jest
        .spyOn(configService, 'get')
        .mockImplementation(<T>(key: string, defaultValue: T) => {
          if (key === 'PASSWORD_PEPPER') {
            return '' as T;
          }
          return defaultValue;
        });
      service = new EncryptionService(configService);
      const hash = await service.hash('password');
      expect(typeof hash).toBe('string');
    });

    it('should throw BadRequestException for empty value', async () => {
      await expect(service.hash('')).rejects.toThrow(BadRequestException);
    });

    it('should use pepper if set', async () => {
      jest
        .spyOn(configService, 'get')
        .mockImplementation(<T>(key: string, defaultValue: T) => {
          if (key === 'PASSWORD_PEPPER') {
            return 'pepper123' as T;
          }
          return defaultValue;
        });

      service = new EncryptionService(configService);
      const hash = await service.hash('password');

      expect(typeof hash).toBe('string');
    });

    it('should handle argon2.hash errors', async () => {
      jest.spyOn(argon2, 'hash').mockRejectedValue(new Error('fail'));

      await expect(service.hash('password')).rejects.toThrow('Hashing failed');
      jest.restoreAllMocks();
    });

    it('should handle argon2.hash errors with non-Error', async () => {
      jest.spyOn(argon2, 'hash').mockRejectedValue('fail-string');

      await expect(service.hash('password')).rejects.toThrow('Hashing failed');
      jest.restoreAllMocks();
    });
  });

  describe('verify', () => {
    it('should verify a correct value', async () => {
      const value = 'password';
      const hash = await service.hash(value);

      await expect(service.verify(value, hash)).resolves.toBe(true);
    });

    it('should verify without pepper (empty string)', async () => {
      jest
        .spyOn(configService, 'get')
        .mockImplementation(<T>(key: string, defaultValue: T) => {
          if (key === 'PASSWORD_PEPPER') {
            return '' as T;
          }
          return defaultValue;
        });
      service = new EncryptionService(configService);
      const value = 'password';
      const hash = await service.hash(value);
      await expect(service.verify(value, hash)).resolves.toBe(true);
    });

    it('should return false for incorrect value', async () => {
      const hash = await service.hash('password');

      await expect(service.verify('wrong', hash)).resolves.toBe(false);
    });

    it('should throw BadRequestException for missing values', async () => {
      await expect(service.verify('', '')).rejects.toThrow(BadRequestException);
    });

    it('should use pepper if set', async () => {
      jest
        .spyOn(configService, 'get')
        .mockImplementation(<T>(key: string, defaultValue: T) => {
          if (key === 'PASSWORD_PEPPER') {
            return 'pepper123' as T;
          }
          return defaultValue;
        });
      service = new EncryptionService(configService);
      const value = 'password';
      const hash = await service.hash(value);

      await expect(service.verify(value, hash)).resolves.toBe(true);
    });

    it('should handle argon2.verify errors', async () => {
      jest.spyOn(argon2, 'verify').mockRejectedValue(new Error('fail'));
      const hash = await service.hash('password');

      await expect(service.verify('password', hash)).rejects.toThrow(
        'Verification failed',
      );
      jest.restoreAllMocks();
    });

    it('should handle argon2.verify errors with non-Error', async () => {
      jest.spyOn(argon2, 'verify').mockRejectedValue('fail-string');
      const hash = await service.hash('password');

      await expect(service.verify('password', hash)).rejects.toThrow(
        'Verification failed',
      );
      jest.restoreAllMocks();
    });

    it('should use default parameters', async () => {
      await expect(service.verify()).rejects.toThrow(BadRequestException);
    });
  });

  describe('generateTemporaryPassword', () => {
    it('should generate a password of given length', () => {
      const pwd = service.generateTemporaryPassword(16);
      expect(pwd).toHaveLength(16);
    });

    it('should generate a password of minimum allowed length (8)', () => {
      const pwd = service.generateTemporaryPassword(8);
      expect(pwd).toHaveLength(8);
    });

    it('should throw BadRequestException for length < 8', () => {
      expect(() => service.generateTemporaryPassword(7)).toThrow(
        BadRequestException,
      );
    });

    it('should include all character types', () => {
      const pwd = service.generateTemporaryPassword(16);

      expect(/[a-z]/.test(pwd)).toBe(true);
      expect(/[A-Z]/.test(pwd)).toBe(true);
      expect(/[0-9]/.test(pwd)).toBe(true);
      expect(/[!@#$%^&*()\-_=+]/.test(pwd)).toBe(true);
    });

    it('should use default length', () => {
      const pwd = service.generateTemporaryPassword();
      expect(pwd).toHaveLength(12);
    });
  });

  describe('generateUniqueToken', () => {
    it('should generate a token of expected length', () => {
      const token = service.generateUniqueToken(32);

      expect(token.length).toBeGreaterThanOrEqual(43);
    });

    it('should generate a token with custom byte length', () => {
      const token = service.generateUniqueToken(64);
      expect(token.length).toBeGreaterThanOrEqual(86); // 64 bytes base64url is at least 86 chars
    });

    it('should generate unique tokens', () => {
      const token1 = service.generateUniqueToken();
      const token2 = service.generateUniqueToken();

      expect(token1).not.toEqual(token2);
    });
  });
});
