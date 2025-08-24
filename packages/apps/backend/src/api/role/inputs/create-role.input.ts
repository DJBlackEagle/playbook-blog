import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BaseCreateInput } from '../../../base';

@InputType({ description: 'Input for creating a role' })
export class CreateRoleInput extends PartialType(BaseCreateInput) {
  @Field({ description: 'The name of the role.' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name!: string;

  @Field({ description: 'The description of the role.', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}
