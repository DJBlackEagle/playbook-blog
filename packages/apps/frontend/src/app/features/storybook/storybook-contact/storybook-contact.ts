import { Component } from '@angular/core';
import { Contact } from '../../../shared/components/contact/contact';

@Component({
  selector: 'app-storybook-contact',
  imports: [Contact],
  templateUrl: './storybook-contact.html',
  styleUrl: './storybook-contact.scss',
})
export class StorybookContact {}
