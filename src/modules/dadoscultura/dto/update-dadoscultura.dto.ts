import { PartialType } from '@nestjs/mapped-types';
import { CreateDadosCulturaDto } from './create-dadoscultura.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDadosCulturaDto extends PartialType(CreateDadosCulturaDto) {
  @ApiPropertyOptional()
  nome?: string;

  @ApiPropertyOptional()
  segmento?: string;

  @ApiPropertyOptional()
  perene?: boolean;

  @ApiPropertyOptional()
  temporaria?: boolean;

  @ApiPropertyOptional()
  profundidade_sistema_radicular?: number;

  @ApiPropertyOptional()
  fator?: number;

  @ApiPropertyOptional()
  estagio1?: number;

  @ApiPropertyOptional()
  duracao_estagio1?: number;

  @ApiPropertyOptional()
  estagio2?: number;

  @ApiPropertyOptional()
  duracao_estagio2?: number;

  @ApiPropertyOptional()
  estagio3?: number;

  @ApiPropertyOptional()
  duracao_estagio3?: number;

  @ApiPropertyOptional()
  estagio4?: number;

  @ApiPropertyOptional()
  duracao_estagio4?: number;

  @ApiPropertyOptional()
  image_url?: string;
}
