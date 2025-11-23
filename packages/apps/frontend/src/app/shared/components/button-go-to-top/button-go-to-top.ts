import { Component, Input } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-button-go-to-top',
  imports: [Button],
  templateUrl: './button-go-to-top.html',
  styleUrl: './button-go-to-top.scss',
})
export class ButtonGoToTop {
  @Input() link?: string;
}
