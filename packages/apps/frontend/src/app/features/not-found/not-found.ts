import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../app.routes';
import { Button } from '../../shared/components/button/button';

/**
 * A component displayed when a route is not found (404).
 * Provides a user-friendly message and a link to return to the home page.
 */
@Component({
  selector: 'app-not-found',
  imports: [CommonModule, RouterModule, Button],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  /**
   * The path for the home route.
   * @protected
   */
  protected readonly homePath = AppRoutes.HOME.path;
}
