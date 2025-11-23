import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardStatItem } from './card-stat-item.model';

@Component({
  selector: 'app-card-stat',
  imports: [CommonModule],
  templateUrl: './card-stat.html',
  styleUrl: './card-stat.scss',
})
export class CardStat {
  @Input() card: CardStatItem = { label: '', number: 0 };
}
