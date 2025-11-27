import { Home } from './features/home/home';
import { Login } from './features/login/login';
import { Logout } from './features/logout/logout';
import { PostDetail } from './features/post-detail/post-detail';
import { PostList } from './features/post-list/post-list';
import { Storybook } from './features/storybook/storybook';

/**
 * Defines the shape for application route configuration.
 * Extends Angular's Route type for compatibility.
 */
interface IAppRoute {
  title: string;
  path: string;
  component: any;
  showInNavbar: boolean;
  showInNavbarOnlyLoggedIn: boolean;
  showInNavbarOnlyLoggedOut: boolean;
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
  POSTLIST: {
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
  LOGIN: {
    title: 'Login',
    path: 'login',
    component: Login,
    showInNavbar: true,
    showInNavbarOnlyLoggedIn: false,
    showInNavbarOnlyLoggedOut: true,
  },
  LOGOUT: {
    title: 'Logout',
    path: 'logout',
    component: Logout,
    showInNavbar: true,
    showInNavbarOnlyLoggedIn: true,
    showInNavbarOnlyLoggedOut: false,
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
