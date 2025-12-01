import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { filter, firstValueFrom } from 'rxjs';
import { AppRoutes } from '../app.routes';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

/**
 * A route guard that requires the user to be authenticated.
 * If the user is not logged in, it redirects them to the login page
 * and shows an error notification.
 *
 * @returns A promise that resolves to `true` if the route can be activated,
 * or a `UrlTree` to redirect the user.
 * @example
 * // In app.routes.ts
 * {
 *   path: 'profile',
 *   component: ProfileComponent,
 *   canActivate: [authGuard]
 * }
 */
export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const notificationService = inject(NotificationService);
  const router = inject(Router);

  // Wait until the auth service has finished its initialization.
  await firstValueFrom(toObservable(authService.isInitialized).pipe(filter(Boolean)));

  if (authService.isAuthenticated()) {
    return true;
  }

  notificationService.show('You must be logged in to view this page.', 'error');
  return router.createUrlTree([AppRoutes.LOGIN.path]);
};
