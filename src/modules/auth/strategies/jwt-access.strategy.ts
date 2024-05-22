import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '@/shared/services/api-config.service';
import { JwtStrategyValidate } from '@/modules/auth/interfaces/jwt-strategy-validate.interface';
import { RolesEnum } from '@/decorators/roles.decorator';

interface UserPayload {
  sub: string;
  email: string;
  roles: RolesEnum[];
}

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(private readonly configService: ApiConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getString('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: UserPayload): Promise<JwtStrategyValidate> {
    return {
      sub: payload.sub,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
