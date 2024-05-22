import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '@/decorators/roles.decorator';

export default class SignupDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(45)
  readonly nome: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(3)
  @MaxLength(45)
  readonly email: string = '';

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(45)
  readonly celular?: string = '';

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(45)
  readonly cep?: string = '';

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(45)
  readonly cidade?: string = '';

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  readonly estado?: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  readonly password: string = '';

  @ApiProperty({ enum: RolesEnum, isArray: true, example: [RolesEnum.USER] })
  @IsOptional()
  @IsArray()
  readonly roles: RolesEnum[] = [RolesEnum.USER];
}
