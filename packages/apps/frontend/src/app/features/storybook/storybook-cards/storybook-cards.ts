import { Component } from '@angular/core';
import { Button } from '../../../shared/components/button/button';
import { StorybookCardsCommon } from './storybook-cards-common/storybook-cards-common';
import { StorybookCardsStat } from './storybook-cards-stat/storybook-cards-stat';

@Component({
  selector: 'app-storybook-cards',
  imports: [Button, StorybookCardsStat, StorybookCardsCommon],
  templateUrl: './storybook-cards.html',
  styleUrl: './storybook-cards.scss',
})
export class StorybookCards {}
