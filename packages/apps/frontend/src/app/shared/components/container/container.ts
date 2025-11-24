import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ContainerItem } from './container-item.model';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container.html',
  styleUrl: './container.scss',
})
export class Container {
  @Input() containerItem: ContainerItem = { title: '', content: '' };

  isString(value: any): value is string {
    return typeof value === 'string';
  }
}
