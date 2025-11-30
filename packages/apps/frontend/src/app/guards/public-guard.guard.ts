import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { filter, firstValueFrom } from 'rxjs';
import { AppRoutes } from '../app.routes';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

/**
 * A route guard that prevents access to a route if the user is already authenticated.
 * If the user is logged in, they will be redirected to the home page.
 * @returns A boolean or a UrlTree indicating whether the route can be activated.
 */
export const publicGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const notificationService = inject(NotificationService);
  const router = inject(Router);

  // Wait until the auth service has finished its initialization.
  await firstValueFrom(toObservable(authService.isInitialized).pipe(filter(Boolean)));

  if (authService.isAuthenticated()) {
    notificationService.show('You are already logged in.');
    return router.createUrlTree([AppRoutes.HOME.path]);
  }

  // If user is not authenticated, allow access to the route.
  return true;
};
