import { Component } from '@angular/core';
import { AppRoutes } from '../../app.routes';
import { ButtonItem } from '../../shared/components/button-list/button-item.model';
import { ButtonList } from '../../shared/components/button-list/button-list';
import { Button } from '../../shared/components/button/button';
import { Link } from '../../shared/components/link/link';
import { StorybookButtons } from './storybook-buttons/storybook-buttons';
import { StorybookCards } from './storybook-cards/storybook-cards';
import { StorybookContact } from './storybook-contact/storybook-contact';

@Component({
  selector: 'app-storybook',
  imports: [Button, ButtonList, StorybookButtons, StorybookCards, StorybookContact, Link],
  templateUrl: './storybook.html',
  styleUrl: './storybook.scss',
})
export class Storybook {
  readonly R = AppRoutes;
  readonly componentTitle = this.R.STORYBOOK.title;
  tocButtons: ButtonItem[] = [];
  buttonsButtons: ButtonItem[] = [];
  cardsButtons: ButtonItem[] = [];

  constructor() {
    this.tocButtons = [
      { link: '#buttons', isPrimary: true, text: 'Buttons' },
      { link: '#cards', isPrimary: true, text: 'Cards' },
      // { link: '#timeline', isPrimary: true, text: 'Timeline' },
      // { link: '#formular', isPrimary: true, text: 'Formular' },
      { link: '#contact', isPrimary: true, text: 'Contact' },
    ];

    this.buttonsButtons = [
      { link: '#buttons-primary', isPrimary: true, text: 'Primary' },
      { link: '#buttons-secondary', isPrimary: true, text: 'Secondary' },
      { link: '#buttons-mixed', isPrimary: true, text: 'Mixed' },
      { link: '#buttons-single', isPrimary: true, text: 'Single' },
    ];

    this.cardsButtons = [
      { link: '#cards-common', isPrimary: true, text: 'Common' },
      { link: '#cards-stats', isPrimary: true, text: 'Stats' },
      { link: '#cards-progress', isPrimary: true, text: 'Progress' },
    ];
  }
}
