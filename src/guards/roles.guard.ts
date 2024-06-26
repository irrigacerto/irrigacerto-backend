import * as _ from 'lodash';
import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '@/decorators/roles.decorator';

interface UserPayload {
  sub: string;
  email: string;
  roles: string[];
}

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<RolesEnum[]>(
      'roles',
      context.getHandler(),
    );

    if (_.isEmpty(roles)) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as UserPayload;

    return roles.some((role: RolesEnum) =>
      user.roles.includes(role as RolesEnum),
    );
  }
}
