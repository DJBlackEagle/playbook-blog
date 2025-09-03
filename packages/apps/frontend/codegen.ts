import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // URL of your running GraphQL backend. The generator introspects the schema from here.
  schema: 'http://localhost:3000/graphql',

  // A glob pattern to find all files containing GraphQL operations (queries, mutations).
  documents: 'src/**/*.gql.ts',

  // Defines where the output is generated and which plugins to use.
  generates: {
    'src/app/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
      config: {
        // This option ensures that the generated services are named cleanly.
        addExplicitOverride: true,
      },
    },
  },
};

export default config;
