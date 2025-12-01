import { Component, inject } from '@angular/core';
import { Config } from '../../core/services/config';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private configService = inject(Config);
  siteName = this.configService.siteName;
}
