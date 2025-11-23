import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-link',
  imports: [CommonModule, RouterLink],
  templateUrl: './link.html',
  styleUrl: './link.scss',
})
export class Link {
  private readonly router = inject(Router);
  private _link?: string;

  /** Determines if the link is an external URL (starts with http). */
  isExternal: boolean = false;

  /** Determines if the link contains an anchor/fragment. */
  isAnchor: boolean = false;

  /** The path part of a link, used for routerLink. */
  path: string | null = null;

  /** The fragment part of a link (the part after '#'). */
  fragment: string | undefined;

  /**
   * An optional URL. If provided, the component will render as an anchor tag.
   * Can be an internal route (e.g., '/home'), an external URL, or an anchor link (e.g., '#cards').
   */
  @Input()
  set link(value: string | undefined) {
    this._link = value;
    this.isExternal = false;
    this.isAnchor = false;
    this.path = null;
    this.fragment = undefined;

    if (!value) {
      return;
    }

    if (value.startsWith('http')) {
      this.isExternal = true;
    } else if (value.includes('#')) {
      this.isAnchor = true;
      const [path, fragment] = value.split('#');
      this.path = path || this.router.url.split('?')[0].split('#')[0];
      this.fragment = fragment || undefined;
    } else {
      // This block handles regular internal links like '/storybook'
      this.path = value;
    }
  }

  get link(): string | undefined {
    return this._link;
  }
}
