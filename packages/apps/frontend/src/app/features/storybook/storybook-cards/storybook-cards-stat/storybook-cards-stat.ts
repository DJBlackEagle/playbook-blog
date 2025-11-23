import { Component } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { CardStatList } from '../../../../shared/components/card-stat-list/card-stat-list';
import { CardStat } from '../../../../shared/components/card-stat/card-stat';
import { CardStatItem } from '../../../../shared/components/card-stat/card-stat-item.model';

@Component({
  selector: 'app-storybook-cards-stat',
  imports: [Button, CardStat, CardStatList],
  templateUrl: './storybook-cards-stat.html',
  styleUrl: './storybook-cards-stat.scss',
})
export class StorybookCardsStat {
  cardItem01: CardStatItem;
  cardItem02: CardStatItem;
  cardItem02_01: CardStatItem;
  cardItem02_02: CardStatItem;
  cardItems01: CardStatItem[] = [];
  cardItems02: CardStatItem[] = [];

  constructor() {
    this.cardItem01 = { label: 'Likes', number: 500 };

    this.cardItem02 = { label: 'Total Users', number: 1200 };
    this.cardItem02_01 = { label: 'Active Users', number: 875 };
    this.cardItem02_02 = { label: 'New Signups', number: 150 };

    this.cardItems01.push({ label: 'Posts', number: 250 }, { label: 'Comments', number: 1250 });

    this.cardItems02.push(
      { label: 'Page Views', number: 5000 },
      { label: 'Unique Visitors', number: 3500 },
      { label: 'Bounce Rate', number: 25 },
      { label: 'Average Session Duration', number: 300 },
    );
  }
}
