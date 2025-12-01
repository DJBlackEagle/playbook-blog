import { Component } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { CardProgress } from '../../../../shared/components/card-progress/card-progress';
import { CardProgressItem } from '../../../../shared/components/card-progress/card-progress-item.model';
import { CardProgressList } from '../../../../shared/components/card-progress/card-progress-list';

@Component({
  selector: 'app-storybook-cards-progress',
  imports: [Button, CardProgress, CardProgressList],
  templateUrl: './storybook-cards-progress.html',
  styleUrl: './storybook-cards-progress.scss',
})
export class StorybookCardsProgress {
  cardProgressItem01: CardProgressItem;
  cardProgressItem02: CardProgressItem;
  cardProgressItem02_01: CardProgressItem;
  cardProgressItem03: CardProgressItem[] = [];
  // cardProgressItems01: CardProgressItem[] = [];
  // cardProgressItems02: CardProgressItem[] = [];
  // cardProgressItems03: CardProgressItem[] = [];
  // cardProgressItems04: CardProgressItem[] = [];

  constructor() {
    this.cardProgressItem01 = {
      title: '📢 Single Card Title #1 (Single)',
      content: '📄 This is a description for Card 1.',
      precentage: 75,
    };

    this.cardProgressItem02 = {
      title: '🎯 Mission Statement #2 (Single)',
      content:
        'To create digital experiences that inspire, engage, and solve real-world problems through innovative design and development.',
      precentage: 90,
    };

    this.cardProgressItem02_01 = {
      title: '🚀 Launch Progress #2A (Single)',
      content: 'Preparing for liftoff with 85% of tasks completed.',
      precentage: 85,
    };

    this.cardProgressItem03 = [
      {
        title: '📢 Single Card Title #3A (List)',
        content: 'This is a description for Card 3A.',
        precentage: 60,
      },
      {
        title: '📄 Single Card Title #3B (List)',
        content: 'This is a description for Card 3B.',
        precentage: 85,
      },
      {
        title: '📢 Single Card Title #3C (List)',
        content: 'This is a description for Card 3C.',
        precentage: 40,
      },
    ];
  }
}
