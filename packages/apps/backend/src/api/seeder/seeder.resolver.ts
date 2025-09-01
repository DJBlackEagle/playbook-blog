import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SeederInput } from './inputs/seeder.input';
import { Seeder } from './sedder.model';
import { SeederService } from './seeder.service';

/**
 * Resolver for seeding operations.
 * Handles GraphQL mutations for seeding data.
 */
@Resolver(() => Seeder)
export class SeederResolver {
  /**
   * Constructor for SeederResolver.
   * Initializes the resolver with the SeederService.
   * @param seederService - Service to handle seeding operations.
   */
  constructor(private readonly seederService: SeederService) {}

  /**
   * Seeds initial data.
   * @returns Seeder instance with seeded data.
   */
  @Mutation(() => Seeder, { description: 'Seed initial data' })
  async seedData(
    @Args('seederInput') seederInput: SeederInput,
  ): Promise<Seeder> {
    return this.seederService.seedData(seederInput);
  }
}
