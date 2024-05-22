import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreateSistemaIrrigacaoDto {
  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  quantidade_setores: number;

  @ApiProperty()
  @IsNotEmpty()
  tipo_irrigacao: number;

  @ApiProperty()
  @IsNotEmpty()
  area_irrigada: number;

  @ApiProperty()
  @IsNotEmpty()
  espacamento_linha: number;

  @ApiProperty()
  @IsNotEmpty()
  coeficiente_uniformidade: number;

  @ApiProperty()
  @IsNotEmpty()
  eficiencia_sistema: number;

  @ApiPropertyOptional()
  @IsOptional()
  vazao_asperssor: number;

  @ApiPropertyOptional()
  @IsOptional()
  espacamento_asperssor: number;

  @ApiPropertyOptional()
  @IsOptional()
  vazao_emissor: number;

  @ApiPropertyOptional()
  @IsOptional()
  espacamento_emissor: number;

  @ApiPropertyOptional()
  @IsOptional()
  percentual_area_molhada: number;

  @ApiPropertyOptional()
  @IsOptional()
  percentual_area_sombreada: number;

  @ApiPropertyOptional()
  @IsOptional()
  ativo: boolean;

  @ApiPropertyOptional()
  @IsNotEmpty()
  id_propriedade: number;
}
