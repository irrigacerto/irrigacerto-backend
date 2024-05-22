import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiExtraModels,
} from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordRequestDto } from '@/modules/auth/dto/reset-passsword-request.dto';
import { ResetPasswordDto } from '@/modules/auth/dto/reset-password.dto';
import { ApiConfigService } from '@/shared/services/api-config.service';
import { Reset } from '@/modules/auth/interfaces/reset.interface';
import { DecodedUser } from '@/modules/auth/interfaces/decoded-user.interface';
import Auth from '@/decorators/auth.decorator';
import UserService from '@/modules/user/user.service';
import AuthBearer from '@/decorators/auth-bearer.decorator';
import WrapResponseInterceptor from '@/interceptors/wrap-response.interceptor';
import AuthService from '@/modules/auth/auth.service';
import RefreshTokenDto from '@/modules/auth/dto/refresh-token.dto';
import LoginDto from '@/modules/auth/dto/login.dto';
import SignupDto from '@/modules/auth/dto/signup.dto';
import JwtTokenDto from '@/modules/auth/dto/jwt-token.dto';

@ApiTags('Auth')
@ApiExtraModels(JwtTokenDto)
@UseInterceptors(WrapResponseInterceptor)
@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ApiConfigService,
  ) {}

  @ApiBody({ type: LoginDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<JwtTokenDto> {
    const validatedUser = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (validatedUser === null) {
      throw new UnauthorizedException('Login ou senha incorreta.');
    }

    return this.authService.login({
      sub: validatedUser.sub,
      email: validatedUser.email,
      roles: validatedUser.roles,
    });
  }

  @ApiBody({ type: SignupDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() user: SignupDto): Promise<JSON> {
    const created = await this.userService.create(user);
    if (created) {
      const login = await this.authService.login({
        sub: created.id,
        email: created.email,
        roles: created.roles,
      });
      const result = [login];
      // let result = [created, login];
      return JSON.parse(JSON.stringify(result));
    } else {
      return null;
    }
  }

  @ApiBearerAuth()
  @Auth()
  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<JwtTokenDto | never> {
    const decodedUser = this.jwtService.decode(
      refreshTokenDto.refreshToken,
    ) as DecodedUser;

    if (!decodedUser) {
      throw new ForbiddenException('Token incorreto.');
    }

    const oldRefreshToken: string | null =
      await this.authService.getRefreshTokenByEmail(decodedUser.email);

    if (!oldRefreshToken || oldRefreshToken !== refreshTokenDto.refreshToken) {
      throw new UnauthorizedException(
        'Credenciais de autenticação ausentes ou incorretas.',
      );
    }

    const payload = {
      sub: decodedUser.sub,
      email: decodedUser.email,
      roles: decodedUser.roles,
    };

    return this.authService.login(payload);
  }

  @ApiBody({ type: ResetPasswordRequestDto })
  @HttpCode(HttpStatus.OK)
  @Post('request-password-reset')
  async requestPasswordReset(
    @Body() resetPasswordRequestDto: ResetPasswordRequestDto,
    //): Promise<CreateReset> {
  ): Promise<boolean> {
    return await this.authService.createPasswordResetToken(
      resetPasswordRequestDto.email,
    );
  }

  @ApiBody({ type: ResetPasswordDto })
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<Reset> {
    return await this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword,
    );
  }

  @ApiBearerAuth()
  @Auth()
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@AuthBearer() token: string): Promise<void> {
    const decodedUser: DecodedUser | null = await this.authService.verifyToken(
      token,
      this.configService.getString('JWT_ACCESS_SECRET'),
    );

    if (!decodedUser) {
      throw new ForbiddenException('Token incorreto.');
    }

    const deletedTokensCount = await this.authService.deleteTokenByEmail(
      decodedUser.email,
    );

    if (deletedTokensCount === 0) {
      throw new NotFoundException();
    }
  }
}
