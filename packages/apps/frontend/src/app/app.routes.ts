import { Home } from './features/home/home';
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
  },
  POSTLIST: {
    title: 'Posts',
    path: 'posts',
    component: PostList,
    showInNavbar: true,
  },
  POST_DETAIL: {
    title: 'Post',
    path: 'post/:id',
    component: PostDetail,
    showInNavbar: false,
  },
  STORYBOOK: {
    title: 'Storybook',
    path: 'storybook',
    component: Storybook,
    showInNavbar: false,
  },
} as const satisfies Record<string, IAppRoute>;
