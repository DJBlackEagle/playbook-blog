---
description: 'Angular-specific coding standards and best practices'
applyTo: '**/*.ts, **/*.html, **/*.scss, **/*.css'
---

# Angular Development Instructions

Instructions for generating high-quality Angular applications with TypeScript, using Angular Signals for state management, adhering to Angular best practices as outlined at https://angular.dev.

## Project Context

- Latest Angular version (use standalone components by default)
- TypeScript for type safety
- Angular CLI for project setup and scaffolding
- Follow Angular Style Guide (https://angular.dev/style-guide)
- Use Angular Material or other modern UI libraries for consistent styling (if specified)

## Development Standards

### Architecture

- Use standalone components unless modules are explicitly required
- Organize code by feature modules or domains for scalability
- Implement lazy loading for feature modules to optimize performance
- Use Angular's built-in dependency injection system effectively
- Structure components with a clear separation of concerns (smart vs. presentational components)

### TypeScript

- Enable strict mode in `tsconfig.json` for type safety
- Define clear interfaces and types for components, services, and models
- Use type guards and union types for robust type checking
- Implement proper error handling with RxJS operators (e.g., `catchError`)
- Use typed forms (e.g., `FormGroup`, `FormControl`) for reactive forms

### Component Design

- Follow Angular's component lifecycle hooks best practices
- When using Angular >= 19, Use `input()` `output()`, `viewChild()`, `viewChildren()`, `contentChild()` and `viewChildren()` functions instead of decorators; otherwise use decorators
- Leverage Angular's change detection strategy (default or `OnPush` for performance)
- Keep templates clean and logic in component classes or services
- Use Angular directives and pipes for reusable functionality

### Styling

- Use Angular's component-level CSS encapsulation (default: ViewEncapsulation.Emulated)
- Prefer SCSS for styling with consistent theming
- Implement responsive design using CSS Grid, Flexbox, or Angular CDK Layout utilities
- Follow Angular Material's theming guidelines if used
- Maintain accessibility (a11y) with ARIA attributes and semantic HTML

### State Management

- Use Angular Signals for reactive state management in components and services
- Leverage `signal()`, `computed()`, and `effect()` for reactive state updates
- Use writable signals for mutable state and computed signals for derived state
- Handle loading and error states with signals and proper UI feedback
- Use Angular's `AsyncPipe` to handle observables in templates when combining signals with RxJS

### Data Fetching

- Use Angular's `HttpClient` for API calls with proper typing
- Implement RxJS operators for data transformation and error handling
- Use Angular's `inject()` function for dependency injection in standalone components
- Implement caching strategies (e.g., `shareReplay` for observables)
- Store API response data in signals for reactive updates
- Handle API errors with global interceptors for consistent error handling

### Security

- Sanitize user inputs using Angular's built-in sanitization
- Implement route guards for authentication and authorization
- Use Angular's `HttpInterceptor` for CSRF protection and API authentication headers
- Validate form inputs with Angular's reactive forms and custom validators
- Follow Angular's security best practices (e.g., avoid direct DOM manipulation)

### Performance

- Enable production builds with `ng build --prod` for optimization
- Use lazy loading for routes to reduce initial bundle size
- Optimize change detection with `OnPush` strategy and signals for fine-grained reactivity
- Use trackBy in `ngFor` loops to improve rendering performance
- Implement server-side rendering (SSR) or static site generation (SSG) with Angular Universal (if specified)

### Testing

- Name test files with .spec.ts suffix
- Write unit tests for components, services, and pipes using Jest and Angular Testing Library
- Use Angular's `TestBed` for component testing with mocked dependencies
- Test signal-based state updates using Angular's testing utilities
- Write end-to-end tests with Cypress or Playwright (if specified)
- Mock HTTP requests using `HttpClientTestingModule`
- Ensure high test coverage for critical functionality

## Project Structure Best Practices (Angular)

This structure is aligned with the [Angular Style Guide](https://angular.dev/style-guide), emphasizing **feature-first organization**, **standalone components**, and **separation of shared/core code**.

```
src/
├── app/
│   ├── features/                  # Each folder is a feature area (domain)
│   │   ├── user/                  # Example feature: User
│   │   │   ├── user.component.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.model.ts
│   │   │   └── ...                # Other user-related files (directives, pipes, etc.)
│   │   ├── dashboard/             # Example feature: Dashboard
│   │   │   ├── dashboard.component.ts
│   │   │   ├── dashboard.routes.ts
│   │   │   └── ...
│   │   └── ...                    # More features
│   ├── shared/                    # Reusable UI components, directives, pipes
│   │   ├── button/
│   │   │   ├── button.component.ts
│   │   │   └── ...
│   │   └── ...
│   ├── core/                      # Singleton services, guards, interceptors, app-wide providers
│   │   ├── auth.service.ts
│   │   ├── http.interceptor.ts
│   │   └── ...
│   ├── app.config.ts              # Application-wide configuration
│   ├── app.routes.ts              # Top-level route definitions
│   └── app.component.ts           # Root component
├── assets/                        # Static assets (images, fonts, etc.)
├── environments/                  # Environment-specific configs
└── main.ts                        # Application entry point
```

### Explanation

- **features/**  
  Organize by feature/domain. Each feature folder contains all related components, services, models, and routes. This supports scalability and maintainability.

- **shared/**  
  Contains reusable UI components, directives, and pipes used across multiple features. Example: buttons, modals, custom pipes.

- **core/**  
  Contains singleton services (e.g., authentication, API), guards, interceptors, and other app-wide providers. These are loaded once and used throughout the app.

- **app.config.ts & app.routes.ts**  
  Centralized configuration and top-level routing for the application.

- **assets/**  
  Static files like images, fonts, and icons.

- **environments/**  
  Environment-specific configuration files (e.g., `environment.prod.ts`, `environment.ts`).

- **main.ts**  
  The application’s entry point, responsible for bootstrapping the root component.

---

**This structure:**

- Follows the Angular Style Guide’s recommendation to group by feature.
- Encourages the use of standalone components and feature-based routing.
- Separates shared and core code for clarity and reusability.
- Scales well for large applications and teams.

## Implementation Process

1. Plan project structure and feature modules
2. Define TypeScript interfaces and models
3. Scaffold components, services, and pipes using Angular CLI
4. Implement data services and API integrations with signal-based state
5. Build reusable components with clear inputs and outputs
6. Add reactive forms and validation
7. Apply styling with SCSS and responsive design
8. Implement lazy-loaded routes and guards
9. Add error handling and loading states using signals
10. Write unit and end-to-end tests
11. Optimize performance and bundle size

## Additional Guidelines

- Follow Angular's naming conventions (e.g., `feature.component.ts`, `feature.service.ts`)
- Use Angular CLI commands for generating boilerplate code
- Document components and services with clear JSDoc comments
- Ensure accessibility compliance (WCAG 2.1) where applicable
- Use Angular's built-in i18n for internationalization (if specified)
- Keep code DRY by creating reusable utilities and shared modules
- Use signals consistently for state management to ensure reactive updates
