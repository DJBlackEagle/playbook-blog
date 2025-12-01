import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Config } from '../../../core/services/config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private configService = inject(Config);
  siteAuthorName = this.configService.siteAuthorName();
  copyrightStartYear = this.configService.siteCopyrightStartYear();
  copyrightEndYear = this.configService.siteCopyrightEndYear();
}
