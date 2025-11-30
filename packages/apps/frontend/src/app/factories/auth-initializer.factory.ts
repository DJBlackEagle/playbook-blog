import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Factory for an APP_INITIALIZER that ensures the AuthService is initialized
 * before the application starts. This prevents race conditions with route guards.
 * @returns A function that returns a Promise that resolves when initialization is complete.
 */
export function authInitializerFactory(): () => Promise<void> {
  const authService = inject(AuthService);
  return () => authService.initializeAuthState();
}
