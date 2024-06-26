import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((data, context) => {
  const ctx = GqlExecutionContext.create(context);
  const { req } = ctx.getContext();
  return req.user;
});
