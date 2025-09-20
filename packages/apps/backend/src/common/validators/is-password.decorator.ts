import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Options for password validation.
 *
 * @property min - The minimum allowed length of the password.
 * @property max - The maximum allowed length of the password.
 * @property required - Whether the password is required (non-empty).
 * @property requireUppercase - Whether at least one uppercase letter is required.
 * @property requireLowercase - Whether at least one lowercase letter is required.
 * @property requireNumber - Whether at least one numeric digit is required.
 * @property requireSpecial - Whether at least one special character is required.
 */
export interface IsPasswordOptions {
  min?: number;
  max?: number;
  required?: boolean;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumber?: boolean;
  requireSpecial?: boolean;
}

/**
 * Validator constraint for checking if a value is a valid password.
 *
 * This constraint validates that the password:
 * - Is a string (if required)
 * - Has a length between the specified `min` and `max` (defaults: 8-64)
 * - Optionally requires uppercase, lowercase, numbers, and special characters
 * - Can be optional if `required` is set to `false`
 *
 * @example
 * // Usage with class-validator
 * @Validate(IsPasswordConstraint, [{ min: 8, max: 32, requireUppercase: true }])
 * password: string;
 *
 * @implements {ValidatorConstraintInterface}
 */
@ValidatorConstraint({ async: false })
export class IsPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: any, args: ValidationArguments): boolean {
    const [options] = args.constraints as [IsPasswordOptions];
    const min = options?.min ?? 8;
    const max = options?.max ?? 64;
    const required = options?.required ?? true;
    const requireUppercase = options?.requireUppercase ?? true;
    const requireLowercase = options?.requireLowercase ?? true;
    const requireNumber = options?.requireNumber ?? true;
    const requireSpecial = options?.requireSpecial ?? true;

    if (
      !required &&
      (password === null || password === undefined || password === '')
    ) {
      return true;
    }

    if (typeof password !== 'string') return false;
    if (max > 0 && password.length > max) return false;
    if (password.length < min) return false;
    if (requireUppercase && !/[A-Z]/.test(password)) return false;
    if (requireLowercase && !/[a-z]/.test(password)) return false;
    if (requireNumber && !/[0-9]/.test(password)) return false;
    if (
      requireSpecial &&
      !/[!@#$%^&*(),.?":{}|<>_\-\\[\];'/`~+=]/.test(password)
    )
      return false;

    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    const [options] = args.constraints as [IsPasswordOptions];
    const min = options?.min ?? 8;
    const max = options?.max ?? 64;
    const required = options?.required ?? true;
    const requireUppercase = options?.requireUppercase ?? true;
    const requireLowercase = options?.requireLowercase ?? true;
    const requireNumber = options?.requireNumber ?? true;
    const requireSpecial = options?.requireSpecial ?? true;

    let msg =
      max > 0
        ? `${args.property} must be ${min}-${max} characters`
        : `${args.property} must be at least ${min} characters`;
    const requirements: string[] = [];
    if (requireUppercase) requirements.push('an uppercase letter');
    if (requireLowercase) requirements.push('a lowercase letter');
    if (requireNumber) requirements.push('a number');
    if (requireSpecial) requirements.push('a special character');
    if (requirements.length) {
      msg += ` and contain at least ${requirements.join(', ')}`;
    }
    msg += '.';
    if (!required) {
      msg += ` (optional)`;
    }
    return msg;
  }
}

/**
 * Decorator that validates whether a property value is a valid password.
 *
 * This decorator validates that the password:
 * - Is a string (if required)
 * - Has a length between the specified `min` and `max` (defaults: 8-64)
 * - Optionally requires uppercase, lowercase, numbers, and special characters
 * - Can be optional if `required` is set to `false`
 *
 * @param options - Optional configuration for password validation.
 * @param validationOptions - Optional validation options for class-validator.
 *
 * @remarks
 * This decorator registers a custom validator (`IsPasswordConstraint`) for the decorated property.
 * The `options` parameter allows customization of the password validation logic.
 * The `validationOptions` parameter allows customization of validation error messages and other settings.
 *
 * @example
 * ```typescript
 * class User {
 *   @IsPassword({ min: 8, max: 32, requireUppercase: true })
 *   password: string;
 * }
 * ```
 */
export function IsPassword(
  options?: IsPasswordOptions,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options ?? {}],
      validator: IsPasswordConstraint,
    });
  };
}
