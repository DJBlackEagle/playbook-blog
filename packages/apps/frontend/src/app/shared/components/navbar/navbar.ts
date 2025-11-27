import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Config } from '../../../core/services/config';
import { AuthService } from '../../../services/auth.service';
import { MenuItem } from './menu-item.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  imports: [CommonModule, RouterLink],
})
export class Navbar {
  private authService = inject(AuthService);
  private configService = inject(Config);
  siteName = this.configService.siteName();
  isAuthenticated = this.authService.isAuthenticated;

  @Input() menuItems: MenuItem[] = [];

  constructor() {}

  /**
   * Determines if a navigation link should be displayed based on its
   * configuration and the current authentication state.
   * @param item The menu item to check.
   * @returns True if the link should be shown, otherwise false.
   */
  shouldShow(item: MenuItem): boolean {
    if (item.showInNavbarOnlyLoggedIn) return this.authService.isAuthenticated();
    if (item.showInNavbarOnlyLoggedOut) return !this.authService.isAuthenticated();

    return true;
  }
}
