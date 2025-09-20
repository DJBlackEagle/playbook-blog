import type { ValidationArguments, ValidationOptions } from 'class-validator';
import type { IsPasswordOptions } from './is-password.decorator';
import { IsPassword, IsPasswordConstraint } from './is-password.decorator';

describe('IsPasswordConstraint', () => {
  const makeArgs = (
    value: string | null,
    options?: IsPasswordOptions,
  ): ValidationArguments => ({
    value,
    constraints: [options ?? {}],
    object: {},
    property: 'password',
    targetName: 'TestClass',
  });

  it('does not include uppercase requirement in message if requireUppercase is false', () => {
    const constraint = new IsPasswordConstraint();
    const args = {
      ...makeArgs('Abcdef1!', { requireUppercase: false }),
      property: 'pwd',
    };
    const msg = constraint.defaultMessage(args);
    expect(msg).not.toContain('uppercase');
  });

  it('does not include lowercase requirement in message if requireLowercase is false', () => {
    const constraint = new IsPasswordConstraint();
    const args = {
      ...makeArgs('Abcdef1!', { requireLowercase: false }),
      property: 'pwd',
    };
    const msg = constraint.defaultMessage(args);
    expect(msg).not.toContain('lowercase');
  });

  it('does not include number requirement in message if requireNumber is false', () => {
    const constraint = new IsPasswordConstraint();
    const args = {
      ...makeArgs('Abcdef1!', { requireNumber: false }),
      property: 'pwd',
    };
    const msg = constraint.defaultMessage(args);
    expect(msg).not.toContain('number');
  });

  it('does not include special character requirement in message if requireSpecial is false', () => {
    const constraint = new IsPasswordConstraint();
    const args = {
      ...makeArgs('Abcdef1!', { requireSpecial: false }),
      property: 'pwd',
    };
    const msg = constraint.defaultMessage(args);
    expect(msg).not.toContain('special character');
  });

  it('does not include uppercase requirement in message if requireUppercase is false', () => {
    const constraint = new IsPasswordConstraint();
    const args = {
      ...makeArgs('Abcdef1!', { requireUppercase: false }),
      property: 'pwd',
    };
    const msg = constraint.defaultMessage(args);
    expect(msg).not.toContain('uppercase');
  });

  it('does not include lowercase requirement in message if requireLowercase is false', () => {
    const constraint = new IsPasswordConstraint();
    const args = {
      ...makeArgs('Abcdef1!', { requireLowercase: false }),
      property: 'pwd',
    };
    const msg = constraint.defaultMessage(args);
    expect(msg).not.toContain('lowercase');
  });

  it('does not include number requirement in message if requireNumber is false', () => {
    const constraint = new IsPasswordConstraint();
    const args = {
      ...makeArgs('Abcdef1!', { requireNumber: false }),
      property: 'pwd',
    };
    const msg = constraint.defaultMessage(args);
    expect(msg).not.toContain('number');
  });

  it('does not include special character requirement in message if requireSpecial is false', () => {
    const constraint = new IsPasswordConstraint();
    const args = {
      ...makeArgs('Abcdef1!', { requireSpecial: false }),
      property: 'pwd',
    };
    const msg = constraint.defaultMessage(args);
    expect(msg).not.toContain('special character');
  });

  it('returns false for non-string password', () => {
    const constraint = new IsPasswordConstraint();
    const args = makeArgs(12345 as unknown as string);
    expect(constraint.validate(args.value, args)).toBe(false);
  });

  it('returns false for password longer than max', () => {
    const constraint = new IsPasswordConstraint();
    const args = makeArgs('A'.repeat(65));
    expect(constraint.validate(args.value, args)).toBe(false);
  });

  it('validates a strong password (default options)', () => {
    const constraint = new IsPasswordConstraint();
    const args = makeArgs('Abcdef1!');
    expect(constraint.validate(args.value, args)).toBe(true);
  });

  it('invalidates a password missing uppercase', () => {
    const constraint = new IsPasswordConstraint();
    const args = makeArgs('abcdef1!');
    expect(constraint.validate(args.value, args)).toBe(false);
  });

  it('invalidates a password missing lowercase', () => {
    const constraint = new IsPasswordConstraint();
    const args = makeArgs('ABCDEF1!');
    expect(constraint.validate(args.value, args)).toBe(false);
  });

  it('invalidates a password missing number', () => {
    const constraint = new IsPasswordConstraint();
    const args = makeArgs('Abcdefgh!');
    expect(constraint.validate(args.value, args)).toBe(false);
  });

  it('invalidates a password missing special character', () => {
    const constraint = new IsPasswordConstraint();
    const args = makeArgs('Abcdefg1');
    expect(constraint.validate(args.value, args)).toBe(false);
  });

  it('validates a password with custom min/max', () => {
    const constraint = new IsPasswordConstraint();
    const args = makeArgs('Abc1!abc', { min: 8, max: 8 });
    expect(constraint.validate(args.value, args)).toBe(true);
    const argsTooShort = makeArgs('Abc1!', { min: 8 });
    expect(constraint.validate(argsTooShort.value, argsTooShort)).toBe(false);
    const argsTooLong = makeArgs('Abc1!abcabc', { max: 8 });
    expect(constraint.validate(argsTooLong.value, argsTooLong)).toBe(false);
  });

  it('validates optional password if empty and required=false', () => {
    const constraint = new IsPasswordConstraint();
    const args = makeArgs('', { required: false });
    expect(constraint.validate(args.value, args)).toBe(true);
    const argsNull = makeArgs(null, { required: false });
    expect(constraint.validate(argsNull.value, argsNull)).toBe(true);
  });

  it('invalidates empty password if required=true', () => {
    const constraint = new IsPasswordConstraint();
    const args = makeArgs('', { required: true });
    expect(constraint.validate(args.value, args)).toBe(false);
  });

  it('returns a helpful default message', () => {
    const constraint = new IsPasswordConstraint();
    const args = makeArgs('Abcdef1!');
    expect(typeof constraint.defaultMessage(args)).toBe('string');
    expect(constraint.defaultMessage(args)).toContain('password');
  });

  it('returns message with "at least" when max is 0', () => {
    const constraint = new IsPasswordConstraint();
    const args = {
      ...makeArgs('Abcdef1!', { min: 5, max: 0 }),
      property: 'pwd',
    };
    const msg = constraint.defaultMessage(args);
    expect(msg).toContain('pwd must be at least 5 characters');
  });

  it('returns message with (optional) when required is false', () => {
    const constraint = new IsPasswordConstraint();
    const args = {
      ...makeArgs('Abcdef1!', { required: false }),
      property: 'pwd',
    };
    const msg = constraint.defaultMessage(args);
    expect(msg).toContain('(optional)');
  });

  it('returns message without requirements if all are false', () => {
    const constraint = new IsPasswordConstraint();
    const args = {
      ...makeArgs('Abcdef1!', {
        requireUppercase: false,
        requireLowercase: false,
        requireNumber: false,
        requireSpecial: false,
        min: 4,
        max: 10,
      }),
      property: 'pwd',
    };
    const msg = constraint.defaultMessage(args);
    expect(msg).toBe('pwd must be 4-10 characters.');
  });
});

describe('IsPassword decorator', () => {
  it('registers the decorator without error', () => {
    const decorator = IsPassword();
    expect(() => decorator({}, 'password')).not.toThrow();
  });

  it('registers the decorator with options and validationOptions', () => {
    const options: IsPasswordOptions = { min: 10, requireNumber: false };
    const validationOptions: ValidationOptions = {
      message: 'Custom message',
    };
    const decorator = IsPassword(options, validationOptions);
    expect(() => decorator({}, 'password')).not.toThrow();
  });
});
