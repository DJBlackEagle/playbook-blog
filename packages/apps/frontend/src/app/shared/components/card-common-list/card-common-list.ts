import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardCommon } from '../card-common/card-common';
import { CardCommonItem } from '../card-common/card-common-item.model';

@Component({
  selector: 'app-card-common-list',
  imports: [CommonModule, CardCommon],
  templateUrl: './card-common-list.html',
  styleUrl: './card-common-list.scss',
})
export class CardCommonList {
  @Input() cards: CardCommonItem[] = [];
}
