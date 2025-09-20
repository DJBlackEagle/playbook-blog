/* istanbul ignore file */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

/**
 * Custom decorator to extract the current authenticated user from the GraphQL context.
 *
 * Usage example:
 *   @CurrentUser() user: User
 *
 * @param _data - Optional data passed to the decorator (not used).
 * @param ctx - The execution context provided by NestJS.
 * @returns The user object attached to the request, or undefined if not authenticated.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(ctx);
    const context = gqlCtx.getContext<{ req: Request }>();

    return context.req.user;
  },
);
