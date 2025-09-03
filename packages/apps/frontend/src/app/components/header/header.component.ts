import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="app-header">
      <nav class="nav-container">
        <a routerLink="/" class="nav-link" (click)="onHomeClick()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#FFFFFF"
            class="nav-icon"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" />
          </svg>
          <span>Home</span>
        </a>
      </nav>
    </header>
  `,
  styles: `
    :host {
      display: block;
    }
    .app-header {
      background-color: #333;
      color: white;
      padding: 1rem 2rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .nav-container {
      display: flex;
      align-items: center;
    }
    .nav-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      text-decoration: none;
      font-size: 1.2rem;
      font-weight: 500;
      transition: opacity 0.2s ease-in-out;
    }
    .nav-link:hover {
      opacity: 0.8;
    }
    .nav-icon {
      position: relative;
      top: -1px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly navigationService = inject(NavigationService);

  onHomeClick(): void {
    this.navigationService.navigateToHome();
  }
}
