import { PartialType } from '@nestjs/mapped-types';
import { CreateSistemaIrrigacaoDto } from './create-sistemairrigacao.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSistemaIrrigacaoDto extends PartialType(
  CreateSistemaIrrigacaoDto,
) {
  @ApiPropertyOptional()
  nome?: string;

  @ApiPropertyOptional()
  quantidade_setores?: number;

  @ApiPropertyOptional()
  tipo_irrigacao?: number;

  @ApiPropertyOptional()
  area_irrigada?: number;

  @ApiPropertyOptional()
  espacamento_linha?: number;

  @ApiPropertyOptional()
  coeficiente_uniformidade?: number;

  @ApiPropertyOptional()
  eficiencia_sistema?: number;

  @ApiPropertyOptional()
  vazao_asperssor?: number;

  @ApiPropertyOptional()
  espacamento_asperssor?: number;

  @ApiPropertyOptional()
  vazao_emissor?: number;

  @ApiPropertyOptional()
  espacamento_emissor?: number;

  @ApiPropertyOptional()
  percentual_area_molhada?: number;

  @ApiPropertyOptional()
  percentual_area_sombreada?: number;

  @ApiPropertyOptional()
  ativo?: boolean;

  @ApiPropertyOptional()
  id_propriedade?: number;
}
