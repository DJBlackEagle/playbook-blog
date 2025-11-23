import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardStat } from '../card-stat/card-stat';
import { CardStatItem } from '../card-stat/card-stat-item.model';

@Component({
  selector: 'app-card-stat-list',
  imports: [CommonModule, CardStat],
  templateUrl: './card-stat-list.html',
  styleUrl: './card-stat-list.scss',
})
export class CardStatList {
  @Input() cards: CardStatItem[] = [];
}
