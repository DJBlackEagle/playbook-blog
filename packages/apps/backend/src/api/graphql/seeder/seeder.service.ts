import { Injectable } from '@nestjs/common';
import { SeederInput } from './inputs/seeder.input';
import { Seeder } from './models/sedder.model';
import { SeederCommentService } from './seeder-comment/seeder-comment.service';
import { SeederPostService } from './seeder-post/seeder-post.service';
import { SeederRoleService } from './seeder-role/seeder-role.service';
import { SeederUserService } from './seeder-user/seeder-user.service';

/**
 * Service for handling seeding operations.
 *
 * Provides logic to seed initial data and return metadata about the operation.
 */
@Injectable()
export class SeederService {
  /**
   * Constructs the SeederService.
   */
  constructor(
    private readonly seederRoleService: SeederRoleService,
    private readonly seederUserService: SeederUserService,
    private readonly seederPostService: SeederPostService,
    private readonly seederCommentService: SeederCommentService,
  ) {}

  /**
   * Seeds initial data and returns metadata about the operation.
   *
   * @param seederInput Input data for the seeding operation
   * @returns Seeder metadata including start and completion times, and environment
   */
  async seedData(seederInput: SeederInput): Promise<Seeder> {
    const data: Seeder = new Seeder();
    data.startedAt = new Date();
    data.nodeEnv = process.env.NODE_ENV;

    if (seederInput.seedRoles) data.role = await this.seederRoleService.seed();
    if (seederInput.seedUsers) data.user = await this.seederUserService.seed();
    if (seederInput.seedPosts) data.post = await this.seederPostService.seed();
    if (seederInput.seedComments)
      data.comment = await this.seederCommentService.seed();

    data.completedAt = new Date();

    return data;
  }
}
