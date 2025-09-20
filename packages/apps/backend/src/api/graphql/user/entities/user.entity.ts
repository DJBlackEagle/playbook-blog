/* istanbul ignore file */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Query, SchemaTypes, Types } from 'mongoose';
import { EncryptionService } from '../../../../modules/encryption';
import { BaseEntity } from '../../../../shared';

async function hashOnUpdate(this: any, next: () => void): Promise<void> {
  const update = this.getUpdate() || {};
  const pwd =
    update.password ?? update.$set?.password ?? update.$setOnInsert?.password;
  if (!pwd) return next();

  const configService = new ConfigService();
  const encryptionService = new EncryptionService(configService);
  const hashed = await encryptionService.hash(`${pwd}`);
  if (update.password) update.password = hashed;
  if (update.$set?.password) update.$set.password = hashed;
  if (update.$setOnInsert?.password) update.$setOnInsert.password = hashed;
  next();
}

@Schema({ timestamps: true })
class UserEntity extends BaseEntity {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  lastLogin: Date;

  @Prop()
  tokenIdentifier: string;

  @Prop()
  refreshTokenHash: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Role', required: false })
  role: Types.ObjectId;
}

const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

UserEntitySchema.pre('find', function (this: Query<any, any>): void {
  const sort = this.getOptions().sort as
    | Record<string, 1 | -1 | 'asc' | 'desc' | 'ascending' | 'descending'>
    | undefined;

  if (sort && Object.keys(sort).length > 0) {
    if (!sort._id) {
      this.sort({ ...sort, username: 1 });
    }
  } else {
    this.sort({ username: 1 });
  }
});

UserEntitySchema.pre('save', async function (next): Promise<void> {
  if (!this.isModified('password')) return next();

  const configService = new ConfigService();
  const encryptionService = new EncryptionService(configService);
  this.password = await encryptionService.hash(this.password);
  next();
});
UserEntitySchema.pre('findOneAndUpdate', hashOnUpdate);
UserEntitySchema.pre('updateOne', hashOnUpdate);
UserEntitySchema.pre('updateMany', hashOnUpdate);

const UserEntityModel: ModelDefinition = {
  name: 'User',
  schema: UserEntitySchema,
};

export { UserEntity, UserEntityModel, UserEntitySchema };
