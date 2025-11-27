import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutes } from '../../app.routes';
import { AuthService } from '../../services/auth.service';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-logout',
  imports: [CommonModule, ReactiveFormsModule, Button],
  templateUrl: './logout.html',
  styleUrl: './logout.scss',
})
export class Logout {
  readonly R = AppRoutes;
  readonly componentTitle = this.R.LOGOUT.title;
  private readonly authService = inject(AuthService);

  constructor() {}

  protected async logoutNow(): Promise<void> {
    await this.authService.logout();
  }
}
