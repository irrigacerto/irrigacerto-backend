import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DecodedUser } from '@/modules/auth/interfaces/decoded-user.interface';
import { Reset } from '@/modules/auth/interfaces/reset.interface';
import { ValidateUserOutput } from '@/modules/auth/interfaces/validate-user-output.interface';
import { LoginPayload } from '@/modules/auth/interfaces/login-payload.interface';
import { ApiConfigService } from '@/shared/services/api-config.service';
import { addHours } from 'date-fns';
import { SmtpService } from '@/shared/services/smtp/smtp.service';
import UserService from '@/modules/user/user.service';
import AuthRepository from '@/modules/auth/auth.repository';
import JwtTokenDto from '@/modules/auth/dto/jwt-token.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
//import { CreateReset } from '@/modules/auth/interfaces/create-reset.interface';

@Injectable()
export default class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly authRepository: AuthRepository,
    private readonly configService: ApiConfigService,
    private readonly smtpService: SmtpService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<null | ValidateUserOutput> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }

    const passwordCompared = await bcrypt.compare(password, user.password);

    if (!passwordCompared) {
      return null;
    }

    return {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };
  }

  public async login(payload: LoginPayload): Promise<JwtTokenDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getString('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.getNumber('JWT_ACCESS_EXPIRATION_TIME'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getString('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.getNumber('JWT_REFRESH_EXPIRATION_TIME'),
      }),
    ]);

    await this.authRepository.addRefreshToken(payload.email, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  public getRefreshTokenByEmail(email: string): Promise<string | null> {
    return this.authRepository.getToken(email);
  }

  public deleteTokenByEmail(email: string): Promise<number> {
    return this.authRepository.removeToken(email);
  }

  public deleteAllTokens(): Promise<string> {
    return this.authRepository.removeAllTokens();
  }

  public async verifyToken(
    token: string,
    secret: string,
  ): Promise<DecodedUser | null> {
    try {
      const result = await this.jwtService.verifyAsync(token, { secret });

      return result as DecodedUser | null;
    } catch (error) {
      return null;
    }
  }

  //public async createPasswordResetToken(email: string): Promise<CreateReset> {
  public async createPasswordResetToken(email: string): Promise<boolean> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      const reset_password_token = crypto
        .randomBytes(4)
        .toString('hex')
        .toUpperCase();
      const reset_password_expires = addHours(new Date(), 2);

      user.reset_password_token = reset_password_token;
      user.reset_password_expires = reset_password_expires;

      const result = await this.userService.update(user.id, user);
      await this.smtpService.sendEmail(
        user.email,
        `Recuperação de Senha - Manejo Irrigação - ${reset_password_token}`,
        {
          reset_token: reset_password_token,
        },
      );

      // const response = {
      //   reset_password_token: result.reset_password_token,
      //   reset_password_expires: result.reset_password_expires,
      // };

      return true;
    } catch (error) {
      return error;
    }
  }

  public async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<Reset> {
    const user = await this.userService.findByResetPasswordToken(token);
    if (!user) {
      throw new NotFoundException('Invalid token');
    }

    if (new Date() > user.reset_password_expires) {
      throw new BadRequestException('Token expired');
    }
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.reset_password_token = null;
      user.reset_password_expires = null;

      const result = await this.userService.update(user.id, user);
      const response = {
        email: result.email,
      };
      return response as Reset | null;
    } catch (error) {
      return null;
    }
  }
}
