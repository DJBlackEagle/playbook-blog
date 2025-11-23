import { Component } from '@angular/core';
import { CardCommon } from '../../../../shared/components/card-common/card-common';
import { CardCommonItem } from '../../../../shared/components/card-common/card-common-item.model';

@Component({
  selector: 'app-storybook-cards-common',
  imports: [CardCommon],
  templateUrl: './storybook-cards-common.html',
  styleUrl: './storybook-cards-common.scss',
})
export class StorybookCardsCommon {
  cardCommonItems01: CardCommonItem[] = [];
  cardCommonItems02: CardCommonItem[] = [];
  cardCommonItems03: CardCommonItem[] = [];
  cardCommonItems04: CardCommonItem[] = [];

  constructor() {
    this.cardCommonItems01.push({
      title: '📢 TitleCard Title 1',
      content: '📄 This is a description for Card 1.',
    });

    this.cardCommonItems02.push(
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

    this.cardCommonItems03.push(
      { title: '📢 TitleCard Title 3A', content: 'This is a description for Card 3A.' },
      { title: '📄 Card Title 3B', content: 'This is a description for Card 3B.' },
      { title: '📢 TitleCard Title 3C', content: 'This is a description for Card 3C.' },
    );

    this.cardCommonItems04.push(
      { title: '📄 Card Title 4A', content: 'This is a description for Card 4A.' },
      { title: '📄 Card Title 4B', content: 'This is a description for Card 4B.' },
      { title: '📄 Card Title 4C', content: 'This is a description for Card 4C.' },
      { title: '📄 Card Title 4D', content: 'This is a description for Card 4D.' },
    );
  }
}
