import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreateDadosCulturaDto {
  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  segmento: string;

  @ApiProperty()
  @IsNotEmpty()
  perene: boolean;

  @ApiProperty()
  @IsNotEmpty()
  temporaria: boolean;

  @ApiProperty()
  @IsNotEmpty()
  profundidade_sistema_radicular: number;

  @ApiProperty()
  @IsNotEmpty()
  fator: number;

  @ApiPropertyOptional()
  @IsOptional()
  estagio1: number;

  @ApiPropertyOptional()
  @IsOptional()
  duracao_estagio1: number;

  @ApiPropertyOptional()
  @IsOptional()
  estagio2: number;

  @ApiPropertyOptional()
  @IsOptional()
  duracao_estagio2: number;

  @ApiPropertyOptional()
  @IsOptional()
  estagio3: number;

  @ApiPropertyOptional()
  @IsOptional()
  duracao_estagio3: number;

  @ApiPropertyOptional()
  @IsOptional()
  estagio4: number;

  @ApiPropertyOptional()
  @IsOptional()
  duracao_estagio4: number;

  @ApiProperty()
  @IsNotEmpty()
  image_url: string;
}
