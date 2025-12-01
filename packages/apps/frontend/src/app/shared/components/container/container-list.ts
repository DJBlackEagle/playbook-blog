import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Container } from './container';
import { ContainerItem } from './container-item.model';

@Component({
  selector: 'app-container-list',
  standalone: true,
  imports: [CommonModule, Container],
  templateUrl: './container-list.html',
  styleUrl: './container-list.scss',
})
export class ContainerList {
  @Input() containerItems: ContainerItem[] = [];
}
