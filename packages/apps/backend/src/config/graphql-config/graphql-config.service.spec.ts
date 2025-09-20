/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { GraphQLConfigService } from './graphql-config.service';

describe('GraphQLConfigService', () => {
  let service: GraphQLConfigService;
  const OLD_ENV = process.env;

  beforeEach(async () => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphQLConfigService, ConfigService],
    }).compile();
    service = module.get<GraphQLConfigService>(GraphQLConfigService);
  });

  afterEach(() => {
    process.env = OLD_ENV;
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createGqlOptions', () => {
    it('should remove stacktrace from extensions in production', () => {
      process.env.NODE_ENV = 'production';
      const options = service.createGqlOptions();
      if (typeof options.formatError === 'function') {
        const error: any = {
          message: 'Error with stacktrace',
          extensions: {
            stacktrace: ['foo', 'bar'],
          },
        };
        const formatted = options.formatError(error, undefined);

        expect((formatted as any).extensions?.stacktrace).toBeUndefined();
      }
    });

    it('should use INTERNAL_SERVER_ERROR if no code is present', () => {
      process.env.NODE_ENV = 'production';
      const options = service.createGqlOptions();
      if (typeof options.formatError === 'function') {
        const error: any = {
          message: 'No code error',
          extensions: {},
        };
        const formatted = options.formatError(error, undefined);

        expect((formatted as any).code).toBe('INTERNAL_SERVER_ERROR');
        expect((formatted as any).message).toBe('No code error');
      }
    });

    it('should return dev config when NODE_ENV=development', () => {
      process.env.NODE_ENV = 'development';
      const options = service.createGqlOptions();

      expect(options.debug).toBe(true);
      expect(options.playground).toBe(false);
      expect(options.autoSchemaFile).toBe('schema.gql');
      expect(Array.isArray(options.plugins)).toBe(true);
      if (options.plugins && options.plugins.length > 0) {
        expect(typeof options.plugins[0]).toBe('object');
        expect(options.plugins[0]).not.toBeNull();
      }
    });

    it('should return prod config when NODE_ENV=production', () => {
      process.env.NODE_ENV = 'production';
      const options = service.createGqlOptions();

      expect(options.debug).toBe(false);
      expect(options.playground).toBe(false);
      expect(options.autoSchemaFile).toBe('schema.gql');
      expect(Array.isArray(options.plugins)).toBe(true);
      if (options.plugins && options.plugins.length > 0) {
        expect(typeof options.plugins[0]).toBe('object');
        expect(options.plugins[0]).not.toBeNull();
      }
    });

    it('should format error for validation error', () => {
      process.env.NODE_ENV = 'production';
      const options = service.createGqlOptions();
      if (typeof options.formatError === 'function') {
        const error: any = {
          message: 'Validation failed',
          extensions: {
            code: 'BAD_USER_INPUT',
            originalError: { statusCode: 400, message: 'Invalid input' },
          },
        };
        const formatted = options.formatError(error, undefined);

        expect((formatted as any).code).toBe('VALIDATION_ERROR');
        expect((formatted as any).message).toBe('Invalid input');
        expect((formatted as any).extensions?.validationErrors).toBe(
          'Invalid input',
        );
      }
    });

    it('should format error for generic error', () => {
      process.env.NODE_ENV = 'production';
      const options = service.createGqlOptions();
      if (typeof options.formatError === 'function') {
        const error: any = {
          message: 'Some error',
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
          },
        };
        const formatted = options.formatError(error, undefined);

        expect((formatted as any).code).toBe('INTERNAL_SERVER_ERROR');
        expect((formatted as any).message).toBe('Some error');
      }
    });
  });
});
