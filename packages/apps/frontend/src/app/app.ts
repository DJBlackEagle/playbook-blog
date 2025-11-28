import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppRoutes } from './app.routes';
import { Config } from './core/services/config';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog';
import { Footer } from './shared/components/footer/footer';
import { MenuItem } from './shared/components/navbar/menu-item.model';
import { Navbar } from './shared/components/navbar/navbar';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, ToastComponent, ConfirmationDialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  navbarMmenuItems: MenuItem[] = [];

  constructor(
    private titleService: Title,
    private configService: Config,
  ) {
    this.configService.siteName.set('Playbook Blog');
    this.configService.siteAuthorName.set('DJ BlackEagle');
    this.configService.siteCopyrightStartYear.set(2025);
    this.configService.siteCopyrightEndYear.set(new Date().getFullYear());

    this.navbarMmenuItems = Object.values(AppRoutes)
      .filter((route) => route.showInNavbar)
      .map((route) => ({
        label: route.title,
        href: route.path,
        showInNavbarOnlyLoggedIn: route.showInNavbarOnlyLoggedIn,
        showInNavbarOnlyLoggedOut: route.showInNavbarOnlyLoggedOut,
      }));

    this.titleService.setTitle(this.configService.siteName());
  }
}
