import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { firstValueFrom, tap } from 'rxjs';
import { AUTH_TOKEN_KEY } from '../constants/auth.constants';
import { LoginGQL, LogoutGQL, MeGQL, User } from './generated/graphql';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginGQL = inject(LoginGQL);
  private readonly logoutGQL = inject(LogoutGQL);
  private readonly meGQL = inject(MeGQL);
  private readonly router = inject(Router);
  private readonly apollo = inject(Apollo);
  private readonly notificationService = inject(NotificationService);

  readonly isAuthenticated: WritableSignal<boolean> = signal<boolean>(false);
  readonly currentUser: WritableSignal<Partial<User> | null> = signal<Partial<User> | null>(null);

  constructor() {
    void this.initializeAuthState();
  }

  /**
   * Performs the login mutation and handles the response.
   * @param identifier - The user's email or username.
   * @param password - The user's password.
   * @returns A promise that resolves on successful login.
   */
  async login(identifier: string, password: string): Promise<void> {
    const result = await firstValueFrom(
      this.loginGQL.mutate({ variables: { loginInput: { identifier, password } } }).pipe(
        tap((res) => {
          const loginData = res.data?.login;
          if (loginData?.accessToken) {
            this.setToken(loginData.accessToken);
            this.currentUser.set(loginData.user);
          }
        }),
      ),
    );

    if (result.data?.login.accessToken) {
      await this.apollo.client.resetStore();
      await this.router.navigate(['/']);
      this.notificationService.show('Login successful!');
    }
  }

  /**
   * Performs the logout mutation, removes the token, and resets the app state.
   */
  async logout(): Promise<void> {
    try {
      await firstValueFrom(this.logoutGQL.mutate());
    } catch (error) {
      console.error('Logout mutation failed, proceeding with client-side logout:', error);
    } finally {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      this.isAuthenticated.set(false);
      this.currentUser.set(null);
      await this.apollo.client.resetStore();
      await this.router.navigate(['/']);
      this.notificationService.show('You have been logged out.');
    }
  }

  /**
   * Retrieves the auth token from local storage.
   * @returns The token or null if not found.
   */
  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  /**
   * Stores the auth token and updates the authentication state.
   * @param token The JWT to store.
   */
  private setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    this.isAuthenticated.set(true);
  }

  /**
   * Checks for an existing token on app startup and fetches the user.
   */
  private async initializeAuthState(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        const result = await firstValueFrom(this.meGQL.fetch());
        if (result?.data?.me) {
          this.isAuthenticated.set(true);
          this.currentUser.set(result.data.me);
        }
      } catch (error) {
        console.error('Auto login with token failed', error);
        await this.logout();
      }
    }
  }
}
