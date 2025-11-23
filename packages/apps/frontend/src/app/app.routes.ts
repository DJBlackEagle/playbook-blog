import { Blog } from './features/blog/blog';
import { Home } from './features/home/home';
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
  BLOG: {
    title: 'Blog',
    path: 'blog',
    component: Blog,
    showInNavbar: true,
  },
  STORYBOOK: {
    title: 'Storybook',
    path: 'storybook',
    component: Storybook,
    showInNavbar: true,
  },
} as const satisfies Record<string, IAppRoute>;
