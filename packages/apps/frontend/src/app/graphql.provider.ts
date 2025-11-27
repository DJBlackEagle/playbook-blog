import { ApplicationConfig } from '@angular/core';
import { createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { AUTH_TOKEN_KEY } from './constants/auth.constants';

const uri = 'http://localhost:3000/graphql';

export function apolloOptionsFactory() {
  const httpLink = createHttpLink({ uri });

  const authLink = setContext((_, { headers }): { headers: unknown } => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return {
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];
