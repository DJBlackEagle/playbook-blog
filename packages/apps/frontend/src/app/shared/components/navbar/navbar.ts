import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Config } from '../../../core/services/config';
import { MenuItem } from './menu-item.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  imports: [CommonModule],
})
export class Navbar {
  private configService = inject(Config);
  siteName = this.configService.siteName();

  @Input() menuItems: MenuItem[] = [];
}
