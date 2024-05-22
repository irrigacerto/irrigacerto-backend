import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RolesEnum } from '@/decorators/roles.decorator';

interface UserPayload {
  sub: string;
  email: string;
  roles: RolesEnum[];
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export default GetUser;
