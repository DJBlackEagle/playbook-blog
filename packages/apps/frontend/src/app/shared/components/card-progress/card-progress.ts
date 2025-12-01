import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardProgressItem } from './card-progress-item.model';

@Component({
  selector: 'app-card-progress',
  imports: [CommonModule],
  templateUrl: './card-progress.html',
  styleUrl: './card-progress.scss',
})
export class CardProgress {
  @Input() cardProgressItem: CardProgressItem = { title: '', precentage: 0 };
}
