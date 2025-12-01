import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-go-to-top',
  imports: [],
  templateUrl: './button-go-to-top.html',
  styleUrl: './button-go-to-top.scss',
})
export class ButtonGoToTop {
  @Input() link?: string;
}
