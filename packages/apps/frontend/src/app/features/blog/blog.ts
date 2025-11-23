import { Component } from '@angular/core';
import { AppRoutes } from '../../app.routes';

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {
  readonly R = AppRoutes;
  readonly componentTitle = this.R.BLOG.title;
}
