import { Component } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { CardCommon } from '../../../../shared/components/card-common/card-common';
import { CardCommonItem } from '../../../../shared/components/card-common/card-common-item.model';
import { CardCommonList } from '../../../../shared/components/card-common/card-common-list';

@Component({
  selector: 'app-storybook-cards-common',
  imports: [Button, CardCommon, CardCommonList],
  templateUrl: './storybook-cards-common.html',
  styleUrl: './storybook-cards-common.scss',
})
export class StorybookCardsCommon {
  card01: CardCommonItem;
  card02: CardCommonItem;
  card02_01: CardCommonItem;
  card02_02: CardCommonItem;
  cardItems01: CardCommonItem[] = [];
  cardItems02: CardCommonItem[] = [];

  constructor() {
    this.card01 = {
      title: '📢 TitleCard Title',
      content: '📄 This is a description for the Card.',
    };

    this.card02 = {
      title: '🎯 Mission',
      content:
        'To create digital experiences that inspire, engage, and solve real-world problems through innovative design and development.',
    };

    this.card02_01 = {
      title: '💡 Vision',
      content:
        'A world where technology seamlessly integrates with human needs, creating more meaningful digital interactions.',
    };

    this.card02_02 = {
      title: '📢 TitleCard Title',
      content: '📄 This is a description for the Card.',
    };

    this.cardItems01.push(
      {
        title: '🎯 Mission',
        content:
          'To create digital experiences that inspire, engage, and solve real-world problems through innovative design and development.',
      },
      {
        title: '💡 Vision',
        content:
          'A world where technology seamlessly integrates with human needs, creating more meaningful digital interactions.',
      },
    );

    this.cardItems02.push(
      { title: '📢 TitleCard Title 3A', content: 'This is a description for Card 3A.' },
      { title: '📄 Card Title 3B', content: 'This is a description for Card 3B.' },
      { title: '📢 TitleCard Title 3C', content: 'This is a description for Card 3C.' },
      { title: '📄 Card Title 3D', content: 'This is a description for Card 3D.' },
      { title: '📢 TitleCard Title 3E', content: 'This is a description for Card 3E.' },
    );
  }
}
