import {
  IsOptional,
  IsString,
  IsEmail,
  IsArray,
  IsEnum,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { RolesEnum } from '@/decorators/roles.decorator';

export default class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  celular?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cep?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cidade?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  estado?: string;

  @ApiPropertyOptional({ enum: RolesEnum, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(RolesEnum, { each: true })
  roles?: RolesEnum[];
}
