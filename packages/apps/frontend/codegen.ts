import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // URL of your running GraphQL backend. The generator introspects the schema from here.
  schema: 'http://localhost:3000/graphql',

  // Defines where the output is generated and which plugins to use.
  generates: {
    'src/app/features/post-list/generated/graphql.ts': {
      documents: 'src/app/features/post-list/gqls/*.ts',
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
      config: {
        addExplicitOverride: true,
      },
    },
    'src/app/features/post-detail/generated/graphql.ts': {
      documents: 'src/app/features/post-detail/gqls/*.ts',
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
      config: {
        addExplicitOverride: true,
      },
    },
    'src/app/services/generated/graphql.ts': {
      documents: 'src/app/services/gqls/*.gql.ts',
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
      config: {
        addExplicitOverride: true,
      },
    },
  },
};

export default config;
