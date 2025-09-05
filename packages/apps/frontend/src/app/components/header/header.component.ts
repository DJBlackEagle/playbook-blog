import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly navigationService = inject(NavigationService);
  readonly authService = inject(AuthService);

  /**
   * Handles the home link click.
   */
  onHomeClick(): void {
    this.navigationService.navigateToHome();
  }

  /**
   * Handles the logout action.
   */
  async onLogout(): Promise<void> {
    await this.authService.logout();
  }
}
