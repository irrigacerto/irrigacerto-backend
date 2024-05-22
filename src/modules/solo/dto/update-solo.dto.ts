import { PartialType } from '@nestjs/mapped-types';
import { CreateSoloDto } from './create-solo.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSoloDto extends PartialType(CreateSoloDto) {
  @ApiPropertyOptional()
  tipo_solo?: string;

  @ApiPropertyOptional()
  capacidade_campo?: number;

  @ApiPropertyOptional()
  ponto_murcha?: number;

  @ApiPropertyOptional()
  densidade?: number;

  @ApiPropertyOptional()
  id_propriedade?: number;
}
