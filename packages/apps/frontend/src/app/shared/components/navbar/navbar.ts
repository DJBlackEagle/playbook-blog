import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Config } from '../../../core/services/config';
import { AuthService } from '../../../services/auth.service';
import { ConfirmationDialogService } from '../../../services/confirmation-dialog.service';
import { MenuItem } from './menu-item.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  imports: [CommonModule, RouterLink],
})
export class Navbar {
  private readonly authService = inject(AuthService);
  private readonly configService = inject(Config);
  private readonly confirmationDialogService = inject(ConfirmationDialogService);

  // private mobileMenuBtn = viewChild<ElementRef>('mobileMenuBtn');
  // private mobileNav = viewChild<ElementRef>('mobileNav');
  // private testus = viewChild<ElementRef>('testus');

  protected siteName = this.configService.siteName();
  protected isAuthenticated = this.authService.isAuthenticated;

  protected isMobileMenuOpen = false;
  protected isScrolled = false;

  @Input() menuItems: MenuItem[] = [];

  /**
   * Determines if a navigation link should be displayed based on its
   * configuration and the current authentication state.
   * @param item The menu item to check.
   * @returns True if the link should be shown, otherwise false.
   */
  protected shouldShow(item: MenuItem): boolean {
    if (item.showInNavbarOnlyLoggedIn) return this.isAuthenticated();
    if (item.showInNavbarOnlyLoggedOut) return !this.isAuthenticated();

    return true;
  }

  /**
   * Listens for the window's scroll event to apply a 'scrolled' class to the navbar.
   */
  @HostListener('window:scroll', [])
  protected onWindowScroll(): void {
    this.isScrolled = window.scrollY > 100;
  }

  /**
   * Toggles the visibility of the mobile navigation menu.
   */
  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  /**
   * Closes the mobile navigation menu, typically after a link is clicked.
   */
  protected closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  protected async onClickLogout(): Promise<void> {
    if (!this.isAuthenticated) return;

    const message = 'Are you sure you want to log out?';
    const confirmed = await this.confirmationDialogService.open(message);
    if (confirmed) {
      await this.authService.logout();
    }
  }
}
