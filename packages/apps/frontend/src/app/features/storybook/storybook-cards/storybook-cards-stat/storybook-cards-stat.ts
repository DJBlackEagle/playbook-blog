import { Component } from '@angular/core';
import { CardStat } from '../../../../shared/components/card-stat/card-stat';
import { CardStatItem } from '../../../../shared/components/card-stat/card-stat-item.model';

@Component({
  selector: 'app-storybook-cards-stat',
  imports: [CardStat],
  templateUrl: './storybook-cards-stat.html',
  styleUrl: './storybook-cards-stat.scss',
})
export class StorybookCardsStat {
  cardStatItems01: CardStatItem[] = [];
  cardStatItems02: CardStatItem[] = [];
  cardStatItems03: CardStatItem[] = [];
  cardStatItems04: CardStatItem[] = [];

  constructor() {
    this.cardStatItems01.push({ label: 'Likes', number: 500 });

    this.cardStatItems02.push(
      { label: 'Total Users', number: 1200 },
      { label: 'Active Users', number: 875 },
      { label: 'New Signups', number: 150 },
    );

    this.cardStatItems03.push({ label: 'Posts', number: 250 }, { label: 'Comments', number: 1250 });

    this.cardStatItems04.push(
      { label: 'Page Views', number: 5000 },
      { label: 'Unique Visitors', number: 3500 },
      { label: 'Bounce Rate', number: 25 },
      { label: 'Average Session Duration', number: 300 },
    );
  }
}
