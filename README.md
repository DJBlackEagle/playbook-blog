# Playbook Blog

A monorepo for a modern blog application, featuring an Angular frontend, a
NestJS backend with GraphQL, and a containerized development environment.
This repository serves as a personal playbook for experimenting with and
demonstrating modern web technologies in a structured project.

## ✨ Features

- **Monorepo:** Managed with pnpm workspaces and Turborepo for efficient
  development.
- **Frontend:** A dynamic and responsive UI built with Angular.
- **Backend:** A powerful GraphQL API powered by NestJS.
- **Development Environment:** Pre-configured for use with
  [VS Code Dev Containers](https://code.visualstudio.com/docs/remote/containers)
  for a consistent and reproducible setup.

## 🚀 Getting Started

This project is designed to be run within a development container. All required
dependencies and services are defined within the container configuration.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
  extension for VS Code.

### Quick Start

1. Clone the repository:

    ```bash
    git clone https://github.com/DJBlackEagle/playbook-blog.git
    ```

2. Open the project in VS Code.
3. **Reopen in Container**:
   - VS Code should detect the Dev Container configuration and show a prompt
     to **"Reopen in Container"**. Click on it.
   - If the prompt does not appear, you can open the Command Palette
     (`Ctrl+Shift+P` or `Cmd+Shift+P`), type `Reopen in Container`, and select
     the **Remote-Containers: Reopen in Container** command.
4. Once the container is running, open a new terminal in VS Code and install
   the dependencies:

    ```bash
    pnpm install
    ```

5. Start the development servers:

    ```bash
    pnpm run start:dev
    ```

Your application stack is now running!

- Frontend will be available at `http://localhost:3000`
- Backend GraphQL Playground will be at `http://localhost:3000/api/graphql`

## 📂 Project Structure

This monorepo is organized as follows:

```markdown
.
├── packages
│   ├── apps
│   │   ├── backend/      # NestJS GraphQL API
│   │   ├── frontend/     # Angular Application
│   │   └── webproxy/     # Proxy server
│   └── ...
├── .devcontainer/        # Dev Container configuration
├── .github/              # GitHub Actions, issue templates, etc.
└── ...
```

- `packages/apps/backend`: The NestJS application, providing the GraphQL API.
- `packages/apps/frontend`: The Angular single-page application.
- `packages/apps/webproxy`: A simple proxy to direct traffic to the appropriate
  application during development.

## Available Scripts

The following scripts can be run from the root of the project using `pnpm <script-name>`:

| Script                    | Description                                                 |
| :------------------------ | :---------------------------------------------------------- |
| **Development**           |                                                             |
| `start`                   | Starts all applications.                                    |
| `start:dev`               | Starts all applications in development mode.                |
| **Build**                 |                                                             |
| `build`                   | Builds all applications for production.                     |
| `build:dev`               | Builds all applications for development.                    |
| **Testing**               |                                                             |
| `test`                    | Runs all tests across the monorepo.                         |
| `test:coverage`           | Generates test coverage reports.                            |
| `test:watch`              | Runs tests in watch mode.                                   |
| `test:e2e`                | Runs end-to-end tests.                                      |
| **Code Quality**          |                                                             |
| `lint`                    | Lints the entire codebase.                                  |
| `format`                  | Formats the entire codebase using Prettier.                 |
| **Cleaning**              |                                                             |
| `clean`                   | Removes all `node_modules`, `.turbo`, and build artifacts.  |
| `clean:build`             | Removes build artifacts.                                    |
| `clean:turbo`             | Removes the Turborepo cache.                                |
| `clean:node`              | Removes all `node_modules` directories.                     |
| **Dependency Management** |                                                             |
| `deps:outdated`           | Checks for outdated dependencies in all packages.           |
| `deps:upgrade`            | Interactively upgrades dependencies to the latest versions. |

## 🌱 Database Seeding

The project includes a seeder to populate the database with initial data for
roles, users, posts, and comments. This is useful for setting up a clean
environment for development and testing. The seeder is triggered by sending a
`SeedData` GraphQL mutation to the backend.

### Understanding the `SeedData` Mutation

A **mutation** in GraphQL is an operation that creates, updates, or deletes data.
The `SeedData` mutation is a custom operation designed to populate the database
with a predefined set of dummy data, which is essential for consistent testing
and rapid development.

You can trigger the seeder by navigating to the GraphQL Playground (`http://localhost:3000/api/graphql`)
and executing the following mutation:

```graphql
mutation SeedData {
  seedData(seederInput: {
    seedRoles: true,
    seedUsers: true,
    seedPosts: true,
    seedComments: true
  }) {
    success
    message
  }
}
```

#### Mutation Breakdown

- **`seedData`**: This is the name of the mutation operation on the server.
- **`seederInput`**: This argument tells the seeder what data to create. You can
  customize the seeding process by changing the boolean flags:
  - `seedRoles`: Creates user roles (e.g., `ADMIN`, `EDITOR`, `USER`).
  - `seedUsers`: Creates a set of default users with different roles.
  - `seedPosts`: Creates sample blog posts.
  - `seedComments`: Creates sample comments and associates them with the posts.
- **`{ success, message }`**: This is the "selection set," which specifies what
  data you want back from the server after the operation. `success` will be
  `true` if the seeding was successful, and `message` will provide details about
  the outcome.

### Default Users

When you seed the database, the following user accounts are created. You can
use these to log in and test the application's different roles and permissions.

| Username    | Password       | Role      |
| :---------- | :------------- | :-------- |
| `admin1`    | `admin123`     | ADMIN     |
| `admin2`    | `admin123`     | ADMIN     |
| `moderator` | `moderator123` | MODERATOR |
| `editor1`   | `editor123`    | EDITOR    |
| `editor2`   | `editor123`    | EDITOR    |
| `editor3`   | `editor123`    | EDITOR    |
| `user1`     | `user123`      | USER      |
