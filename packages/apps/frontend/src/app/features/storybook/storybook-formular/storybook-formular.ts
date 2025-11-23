import { Component } from '@angular/core';
import { Formular } from '../../../shared/components/formular/formular';
import { FormularInputItem } from '../../../shared/components/formular/formular-input-item.model';

@Component({
  selector: 'app-storybook-formular',
  imports: [Formular],
  templateUrl: './storybook-formular.html',
  styleUrl: './storybook-formular.scss',
})
export class StorybookFormular {
  formAction: string = 'submit-form';
  formMethod: 'GET' | 'POST' = 'POST';
  formularInputItem: FormularInputItem[] = [];

  constructor() {
    this.formularInputItem = [
      {
        label: 'Name',
        type: 'text',
        name: 'name',
        placeholder: 'Enter your name',
        required: true,
        disabled: true,
      },
      {
        label: 'Email',
        type: 'email',
        name: 'email',
        placeholder: 'Enter your email',
        required: true,
      },
      {
        label: 'Message',
        type: 'textarea',
        name: 'message',
        placeholder: 'Tell me about your project...',
      },
    ];
  }
}
