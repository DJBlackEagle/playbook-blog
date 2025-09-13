---
applyTo: '**/*.ts'
---

# TypeScript Coding Best Practices

## TypeScript-Specific Guidelines

- Prefer `const` and `let` over `var` for variable declarations.
- Use type annotations for function parameters, return types, and variables.
- Prefer interfaces over type aliases for object shapes.
- Avoid using `any`; use specific types or generics where possible.
- Use ES6+ features and syntax.
- Use async/await for asynchronous code instead of callbacks or raw Promises.
- Use union and intersection types to create flexible and reusable types.
- Use enums for a set of related constants.
- Use the `readonly` modifier for properties that should not be reassigned.
- Use strict type checking

## Formatting

- Use semicolons consistently.
- Use single quotes for strings, except when escaping is easier with double quotes.

## Error Handling

- Use try/catch blocks for asynchronous code and handle errors gracefully.
- Avoid using bare `catch` clauses; specify the error type if possible.

## Documentation

- Add JSDoc comments with example to all public classes, interfaces, functions, and methods.
- Document parameters, return values, and exceptions.
- Document complex logic and decisions with comments

## Testing

- Write unit tests for all functions, classes, components, services, and pipes.
- Use frameworks like Jest.
- Name test files and functions clearly.
- Unit tests should be named spec instead of test.
- Name unit test files with .spec.ts suffix.
- Name E2E test files with .e2e-spec.ts suffix.

## File and Directory Structure

- File and folder names should use kebab-case.
- Use index.ts files for re-exporting modules and simplifying imports.

## Performance

- Profile and optimize only after identifying bottlenecks.
- Use built-in data structures and libraries where possible.

## Version Control

- Commit code with clear, concise messages.
- Do not commit secrets or large binary files.
