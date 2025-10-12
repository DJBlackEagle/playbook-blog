import type { ValidationArguments, ValidationOptions } from 'class-validator';
import { IsUsername, IsUsernameConstraint } from './is-username.decorator';

describe('IsUsernameConstraint', () => {
  const makeArgs = (
    value: string | null,
    options?: any,
  ): ValidationArguments => ({
    value,
    constraints: [options ?? {}],
    object: {},
    property: 'username',
    targetName: 'TestClass',
  });

  it('validates a correct username (default options)', () => {
    const constraint = new IsUsernameConstraint();
    const args = makeArgs('user_123');
    expect(constraint.validate(args.value, args)).toBe(true);
  });

  it('invalidates a username with special characters', () => {
    const constraint = new IsUsernameConstraint();
    const args = makeArgs('user!@#');
    expect(constraint.validate(args.value, args)).toBe(false);
  });

  it('invalidates a username that is too short', () => {
    const constraint = new IsUsernameConstraint();
    const args = makeArgs('ab');
    expect(constraint.validate(args.value, args)).toBe(false);
  });

  it('invalidates a username that is too long', () => {
    const constraint = new IsUsernameConstraint();
    const args = makeArgs('a'.repeat(21));
    expect(constraint.validate(args.value, args)).toBe(false);
  });

  it('validates a username with custom min/max', () => {
    const constraint = new IsUsernameConstraint();
    const args = makeArgs('abcd', { min: 4, max: 4 });
    expect(constraint.validate(args.value, args)).toBe(true);
    const argsTooShort = makeArgs('abc', { min: 4 });
    expect(constraint.validate(argsTooShort.value, argsTooShort)).toBe(false);
    const argsTooLong = makeArgs('abcde', { max: 4 });
    expect(constraint.validate(argsTooLong.value, argsTooLong)).toBe(false);
  });

  it('returns false for non-string username', () => {
    const constraint = new IsUsernameConstraint();
    const args = makeArgs(12345 as unknown as string);
    expect(constraint.validate(args.value, args)).toBe(false);
  });

  it('validates optional username if empty and required=false', () => {
    const constraint = new IsUsernameConstraint();
    const args = makeArgs('', { required: false });
    expect(constraint.validate(args.value, args)).toBe(true);
    const argsNull = makeArgs(null, { required: false });
    expect(constraint.validate(argsNull.value, argsNull)).toBe(true);
  });

  it('invalidates empty username if required=true', () => {
    const constraint = new IsUsernameConstraint();
    const args = makeArgs('', { required: true });
    expect(constraint.validate(args.value, args)).toBe(false);
  });

  it('returns a helpful default message', () => {
    const constraint = new IsUsernameConstraint();
    const args = makeArgs('user_123');
    expect(typeof constraint.defaultMessage(args)).toBe('string');
    expect(constraint.defaultMessage(args)).toContain('username');
  });

  it('returns message with (optional) when required is false', () => {
    const constraint = new IsUsernameConstraint();
    const args = {
      ...makeArgs('user_123', { required: false }),
      property: 'uname',
    };
    const msg = constraint.defaultMessage(args);
    expect(msg).toContain('(optional)');
  });

  it('returns message with custom min/max', () => {
    const constraint = new IsUsernameConstraint();
    const args = {
      ...makeArgs('user_123', { min: 5, max: 10 }),
      property: 'uname',
    };
    const msg = constraint.defaultMessage(args);
    expect(msg).toContain('uname must be 5-10 characters');
  });

  it('returns message with only min if max is 0', () => {
    const constraint = new IsUsernameConstraint();
    const args = {
      ...makeArgs('user_123', { min: 5, max: 0 }),
      property: 'uname',
    };
    const msg = constraint.defaultMessage(args);
    expect(msg).toContain('uname must be 5 characters');
  });
});

describe('IsUsername decorator', () => {
  it('registers the decorator without error', () => {
    const decorator = IsUsername();
    expect(() => decorator({}, 'username')).not.toThrow();
  });

  it('registers the decorator with options and validationOptions', () => {
    const options = { min: 4, max: 16, required: false };
    const validationOptions: ValidationOptions = {
      message: 'Custom message',
    };
    const decorator = IsUsername(options, validationOptions);
    expect(() => decorator({}, 'username')).not.toThrow();
  });
});
