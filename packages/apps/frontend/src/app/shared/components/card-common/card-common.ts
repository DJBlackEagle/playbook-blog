import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardCommonItem } from './card-common-item.model';

@Component({
  selector: 'app-card-common',
  imports: [CommonModule],
  templateUrl: './card-common.html',
  styleUrl: './card-common.scss',
})
export class CardCommon {
  @Input() cardCommonItems: CardCommonItem[] = [];
}
