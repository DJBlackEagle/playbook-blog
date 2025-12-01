/* istanbul ignore file */
import 'reflect-metadata';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

/**
 * Bootstraps the NestJS application.
 *
 * - Creates the application instance
 * - Enables CORS
 * - Configures class-validator to use the NestJS DI container
 * - Sets up global validation pipe
 * - Starts the server on the specified port
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000, '127.0.0.1');
  // await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
