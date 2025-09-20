/* istanbul ignore file */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

/**
 * GraphQL authentication guard for JWT-based authentication.
 *
 * Extends the default Passport JWT AuthGuard to support extracting the request object
 * from the GraphQL execution context, enabling authentication in GraphQL resolvers.
 *
 * @see https://docs.nestjs.com/guards#graphql
 */
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  /**
   * Retrieves the HTTP request object from the GraphQL execution context.
   *
   * @param context - The current execution context.
   * @returns {Request} The Express request object.
   */
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    const graphqlContext = ctx.getContext<{ req: Request }>();

    return graphqlContext.req;
  }
}
