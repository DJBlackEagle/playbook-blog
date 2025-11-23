import { Component } from '@angular/core';
import { AppRoutes } from '../../app.routes';
import { ButtonGoToTop } from '../../shared/components/button-go-to-top/button-go-to-top';
import { ButtonPrimary } from '../../shared/components/button-primary/button-primary';
import { ButtonSecondary } from '../../shared/components/button-secondary/button-secondary';
import { Button } from '../../shared/components/button/button';
import { Link } from '../../shared/components/link/link';
import { StorybookButtons } from './storybook-buttons/storybook-buttons';
import { StorybookCards } from './storybook-cards/storybook-cards';
import { StorybookContact } from './storybook-contact/storybook-contact';
import { StorybookFormular } from './storybook-formular/storybook-formular';
import { StorybookTimeline } from './storybook-timeline/storybook-timeline';

@Component({
  selector: 'app-storybook',
  imports: [
    Button,
    StorybookButtons,
    StorybookCards,
    StorybookTimeline,
    StorybookFormular,
    StorybookContact,
    ButtonPrimary,
    ButtonSecondary,
    ButtonGoToTop,
    Link,
  ],
  templateUrl: './storybook.html',
  styleUrl: './storybook.scss',
})
export class Storybook {
  readonly R = AppRoutes;
  readonly componentTitle = this.R.STORYBOOK.title;
}
