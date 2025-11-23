import { Component } from '@angular/core';
import { FormularInputItem } from '../formular/formular-input-item.model';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
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
        label: 'Email',
        type: 'text',
        name: 'project',
        placeholder: 'Project Type',
        required: true,
      },
      {
        label: 'Message',
        type: 'textarea',
        name: 'message',
        placeholder: 'Tell me about your project...',
        rows: 5,
      },
    ];
  }
}
