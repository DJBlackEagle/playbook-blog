import { CanActivateFn, Routes } from '@angular/router';
import { Home } from './features/home/home';
import { PostCreate } from './features/post-create/post-create';
import { PostDetail } from './features/post-detail/post-detail';
import { PostEdit } from './features/post-edit/post-edit';
import { PostList } from './features/post-list/post-list';
import { Storybook } from './features/storybook/storybook';
import { publicGuard } from './guards';

/**
 * Defines the shape for application route configuration.
 * Extends Angular's Route type for compatibility.
 */
interface IAppRoute {
  title: string;
  path: string;
  component?: any;
  loadComponent?: any;
  showInNavbar: boolean;
  showInNavbarOnlyLoggedIn: boolean;
  showInNavbarOnlyLoggedOut: boolean;
  canActivate?: CanActivateFn[];
}

/**
 * A constant object that holds all application route definitions.
 * This serves as the single source of truth for routing.
 * @example
 * const routePath = AppRoutes.HOME.path; // returns ''
 */
export const AppRoutes = {
  HOME: {
    title: 'Home',
    path: '',
    component: Home,
    showInNavbar: true,
    showInNavbarOnlyLoggedIn: false,
    showInNavbarOnlyLoggedOut: false,
  },
  POST_LIST: {
    title: 'Posts',
    path: 'posts',
    component: PostList,
    showInNavbar: true,
    showInNavbarOnlyLoggedIn: false,
    showInNavbarOnlyLoggedOut: false,
  },
  POST_DETAIL: {
    title: 'Post',
    path: 'post/:id',
    component: PostDetail,
    showInNavbar: false,
    showInNavbarOnlyLoggedIn: false,
    showInNavbarOnlyLoggedOut: false,
  },
  POST_CREATE: {
    title: 'Create Post',
    path: 'post-create',
    component: PostCreate,
    showInNavbar: false,
    showInNavbarOnlyLoggedIn: false,
    showInNavbarOnlyLoggedOut: false,
  },
  POST_EDIT: {
    title: 'Edit Post',
    path: 'post-edit/:id',
    component: PostEdit,
    showInNavbar: false,
    showInNavbarOnlyLoggedIn: false,
    showInNavbarOnlyLoggedOut: false,
  },
  LOGIN: {
    title: 'Login',
    path: 'login',
    showInNavbar: true,
    showInNavbarOnlyLoggedIn: false,
    showInNavbarOnlyLoggedOut: true,
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
    canActivate: [publicGuard],
  },
  STORYBOOK: {
    title: 'Storybook',
    path: 'storybook',
    component: Storybook,
    showInNavbar: false,
    showInNavbarOnlyLoggedIn: false,
    showInNavbarOnlyLoggedOut: false,
  },
} as const satisfies Record<string, IAppRoute>;

export const routes: Routes = Object.values(AppRoutes);
