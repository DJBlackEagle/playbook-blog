import { Module } from '@nestjs/common';
import { AppInfoModule } from './app-info/app-info.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { RoleModule } from './role/role.module';
import { SeederModule } from './seeder/seeder.module';
import { SystemInfoModule } from './system-info/system-info.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppInfoModule,
    UserModule,
    RoleModule,
    PostModule,
    CommentModule,
    SeederModule,
    SystemInfoModule,
    AuthModule,
  ],
})
export class ApiModule {}
