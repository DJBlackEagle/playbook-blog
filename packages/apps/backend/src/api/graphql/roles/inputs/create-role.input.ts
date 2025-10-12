import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BaseInput } from '../../../../shared';

/**
 * Input type for creating a role.
 *
 * Extends the base input and provides fields for name and description.
 */
@InputType({ description: 'Input for creating a role' })
export class CreateRoleInput extends PartialType(BaseInput) {
  /**
   * The name of the role.
   * Must be a non-empty string between 4 and 50 characters.
   */
  @Field({ description: 'The name of the role.' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name!: string;

  /**
   * The description of the role (optional).
   */
  @Field({ description: 'The description of the role.', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}
