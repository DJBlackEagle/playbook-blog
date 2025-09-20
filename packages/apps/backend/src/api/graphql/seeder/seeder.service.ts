import { Injectable } from '@nestjs/common';
import { SeederInput } from './inputs/seeder.input';
import { Seeder } from './models/sedder.model';

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
  constructor() {}

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

    data.completedAt = new Date();

    return data;
  }
}
