import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../button/button';
import { ButtonItem } from './button-item.model';

@Component({
  selector: 'app-button-list',
  imports: [CommonModule, RouterLink, Button],
  templateUrl: './button-list.html',
  styleUrl: './button-list.scss',
})
export class ButtonList {
  @Input() buttons: ButtonItem[] = [];
}
