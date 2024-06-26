import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesEnum } from '@/decorators/roles.decorator';
import JwtAccessGuard from '@/guards/jwt-access.guard';
import RolesGuard from '@/guards/roles.guard';

export default function Auth(...roles: RolesEnum[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAccessGuard, RolesGuard),
  );
}
