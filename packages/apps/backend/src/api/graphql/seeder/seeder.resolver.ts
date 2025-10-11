import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SeederInput } from './inputs/seeder.input';
import { Seeder } from './models/seeder.model';
import { SeederService } from './seeder.service';

/**
 * GraphQL resolver for seeding operations.
 *
 * Provides a mutation to seed initial data using the SeederService.
 */
@Resolver(() => Seeder)
export class SeederResolver {
  /**
   * Injects the SeederService for seeding operations.
   * @param seederService Service handling the seeding logic
   */
  constructor(private readonly seederService: SeederService) {}

  /**
   * GraphQL mutation to seed initial data.
   *
   * @param seederInput Input data for the seeding operation
   * @returns Seeder metadata about the operation
   */
  @Mutation(() => Seeder, { description: 'Seed initial data' })
  async seedData(
    @Args('seederInput') seederInput: SeederInput,
  ): Promise<Seeder> {
    return this.seederService.seedData(seederInput);
  }
}
