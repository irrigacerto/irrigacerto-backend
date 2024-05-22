import { PartialType } from '@nestjs/mapped-types';
import { CreateCulturaDto } from './create-cultura.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCulturaDto extends PartialType(CreateCulturaDto) {
  @ApiPropertyOptional()
  nome_cultura?: string;

  @ApiPropertyOptional()
  data_plantio?: Date;

  @ApiPropertyOptional()
  area_plantio?: number;

  @ApiPropertyOptional()
  estagio_colheita?: number;

  status_cultura?: number;

  @ApiPropertyOptional()
  id_dados_cultura?: number;

  @ApiPropertyOptional()
  id_propriedade?: number;

  @ApiPropertyOptional()
  id_sistema_irrigacao?: number;

  @ApiPropertyOptional()
  id_motobomba?: number;

  @ApiPropertyOptional()
  id_solo?: number;
}
