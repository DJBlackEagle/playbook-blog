import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: 'posts/create',
    component: PostCreateComponent,
    canActivate: [authGuard],
  },
  {
    path: 'posts/:id',
    component: PostDetailComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
