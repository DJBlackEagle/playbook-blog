import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardProgress } from '../card-progress/card-progress';
import { CardProgressItem } from '../card-progress/card-progress-item.model';

@Component({
  selector: 'app-card-progress-list',
  imports: [CommonModule, CardProgress],
  templateUrl: './card-progress-list.html',
  styleUrl: './card-progress-list.scss',
})
export class CardProgressList {
  @Input() cardProgressItems: CardProgressItem[] = [];
}
