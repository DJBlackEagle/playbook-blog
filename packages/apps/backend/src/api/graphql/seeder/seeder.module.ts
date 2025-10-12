import { Module } from '@nestjs/common';
import { CommentModule } from '../comment/comment.module';
import { PostModule } from '../post/post.module';
import { RoleModule } from '../roles/role.module';
import { UserModule } from '../user/user.module';
import { SeederCommentService } from './seeder-comment/seeder-comment.service';
import { SeederPostService } from './seeder-post/seeder-post.service';
import { SeederRoleService } from './seeder-role/seeder-role.service';
import { SeederUserService } from './seeder-user/seeder-user.service';
import { SeederResolver } from './seeder.resolver';
import { SeederService } from './seeder.service';

/**
 * SeederModule provides GraphQL seeding functionality.
 *
 * This module wires up the SeederService and SeederResolver for seeding operations.
 */
@Module({
  imports: [RoleModule, UserModule, PostModule, CommentModule],
  providers: [
    SeederService,
    SeederResolver,
    SeederRoleService,
    SeederUserService,
    SeederPostService,
    SeederCommentService,
  ],
})
export class SeederModule {}
