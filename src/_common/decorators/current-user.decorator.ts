import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const currentUserFactory = (data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<any>();
  return request.user;
};

export const CurrentUser = createParamDecorator(currentUserFactory);
