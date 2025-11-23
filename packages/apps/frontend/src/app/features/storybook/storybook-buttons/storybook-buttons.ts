import { Component } from '@angular/core';
import { ButtonItem } from '../../../shared/components/button-list/button-item.model';
import { ButtonList } from '../../../shared/components/button-list/button-list';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-storybook-buttons',
  imports: [Button, ButtonList],
  templateUrl: './storybook-buttons.html',
  styleUrl: './storybook-buttons.scss',
})
export class StorybookButtons {
  buttonsPrimary: ButtonItem[] = [];
  buttonsSecondary: ButtonItem[] = [];
  buttonsMixed: ButtonItem[] = [];
  buttonsTest01: ButtonItem[] = [];
  buttonsTest02: ButtonItem[] = [];
  buttonsTest03: ButtonItem[] = [];

  constructor() {
    this.buttonsPrimary = [
      {
        link: '#buttons-primary',
        isPrimary: true,
        text: 'Button Primary 1',
      },
      {
        link: '#buttons-primary',
        isPrimary: true,
        text: 'Button Primary 2',
      },
      {
        link: '#buttons-primary',
        isPrimary: true,
        text: 'Button Primary 3',
      },
    ];

    this.buttonsSecondary = [
      {
        link: '#buttons-secondary',
        isPrimary: false,
        text: 'Button Secondary 1',
      },
      {
        link: '#buttons-secondary',
        isPrimary: false,
        text: 'Button Secondary 2',
      },
      {
        link: '#buttons-secondary',
        isPrimary: false,
        text: 'Button Secondary 3',
      },
    ];

    this.buttonsMixed = [
      {
        link: '#buttons-mixed',
        isPrimary: true,
        text: 'Button Mixed 1',
      },
      {
        link: '#buttons-mixed',
        isPrimary: false,
        text: 'Button Mixed 2',
      },
      {
        link: '#buttons-mixed',
        isPrimary: true,
        text: 'Button Mixed 3',
      },
      {
        link: '#buttons-mixed',
        isPrimary: false,
        text: 'Button Mixed 4',
      },
    ];

    this.buttonsTest01 = [
      {
        link: 'http://external-link.com',
        isPrimary: true,
        text: 'External Link Button',
      },
    ];

    this.buttonsTest02 = [
      {
        link: '#anchor-link',
        isPrimary: false,
        text: 'Anchor Link Button',
      },
    ];

    this.buttonsTest03 = [
      {
        link: '/internal-route',
        isPrimary: true,
        text: 'Internal Route Button',
      },
    ];
  }
}
