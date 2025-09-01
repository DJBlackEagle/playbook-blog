import { InputType } from '@nestjs/graphql';
import { BaseInput } from './base.input';

@InputType({ description: 'Base input for creating entities' })
export class BaseCreateInput extends BaseInput {}
