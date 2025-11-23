import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormularInputItem } from './formular-input-item.model';

@Component({
  selector: 'app-formular',
  imports: [CommonModule],
  templateUrl: './formular.html',
  styleUrl: './formular.scss',
})
export class Formular {
  @Input() formAction: string = '';
  @Input() formMethod: 'GET' | 'POST' = 'POST';
  @Input() inputItems: FormularInputItem[] = [];
}
