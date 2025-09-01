import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Options for validating a username.
 *
 * @property min - The minimum allowed length for the username.
 * @property max - The maximum allowed length for the username.
 * @property required - Whether the username is required.
 */
interface IsUsernameOptions {
  min?: number;
  max?: number;
  required?: boolean;
}

/**
 * Validator constraint for checking if a value is a valid username.
 *
 * This constraint validates that the username:
 * - Is a string (if required)
 * - Has a length between the specified `min` and `max` (defaults: 3-20)
 * - Contains only alphanumeric characters and underscores
 * - Can be optional if `required` is set to `false`
 *
 * @example
 * // Usage with class-validator
 * @Validate(IsUsernameConstraint, [{ min: 4, max: 16, required: false }])
 * username: string;
 *
 * @implements {ValidatorConstraintInterface}
 */
@ValidatorConstraint({ async: false })
export class IsUsernameConstraint implements ValidatorConstraintInterface {
  validate(username: any, args: ValidationArguments): boolean {
    const [options] = args.constraints as [IsUsernameOptions];
    const min = options?.min ?? 3;
    const max = options?.max ?? 20;
    const required = options?.required ?? true;

    if (
      !required &&
      (username === null || username === undefined || username === '')
    ) {
      return true;
    }

    if (typeof username !== 'string') return false;
    if (max > 0 && username.length > max) return false;
    if (username.length < min) return false;

    return /^[a-zA-Z0-9_]+$/.test(username);
  }

  defaultMessage(args: ValidationArguments): string {
    const [options] = args.constraints as [IsUsernameOptions];
    const min = options?.min ?? 3;
    const max = options?.max ?? 20;
    const required = options?.required ?? true;

    let msg =
      max > 0
        ? `${args.property} must be ${min}-${max} characters, alphanumeric or underscores only.`
        : `${args.property} must be ${min} characters, alphanumeric or underscores only.`;
    if (!required) {
      msg += ` (optional)`;
    }

    return msg;
  }
}

/**
 * Decorator that validates whether a property value is a valid username.
 *
 * This decorator validates that the username:
 * - Is a string (if required)
 * - Has a length between the specified `min` and `max` (defaults: 3-20)
 * - Contains only alphanumeric characters and underscores
 * - Can be optional if `required` is set to `false`
 *
 * @param options - Optional configuration for username validation.
 * @param validationOptions - Optional validation options for class-validator.
 *
 * @remarks
 * This decorator registers a custom validator (`IsUsernameConstraint`) for the decorated property.
 * The `options` parameter allows customization of the username validation logic.
 * The `validationOptions` parameter allows customization of validation error messages and other settings.
 *
 * @example
 * ```typescript
 * class User {
 *   @IsUsername({ minLength: 3, maxLength: 20 })
 *   username: string;
 * }
 * ```
 */
export function IsUsername(
  options?: IsUsernameOptions,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options ?? {}],
      validator: IsUsernameConstraint,
    });
  };
}
