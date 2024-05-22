import { PartialType } from '@nestjs/mapped-types';
import { CreatePropriedadeDto } from './create-propriedade.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePropriedadeDto extends PartialType(CreatePropriedadeDto) {
  @ApiPropertyOptional()
  nome?: string;

  @ApiPropertyOptional()
  latitude?: string;

  @ApiPropertyOptional()
  longitude?: string;

  @ApiPropertyOptional()
  cidade?: string;

  @ApiPropertyOptional()
  estado?: string;

  @ApiPropertyOptional()
  cep?: string;

  @ApiPropertyOptional()
  area_propriedade?: number;

  @ApiPropertyOptional()
  precipitacao?: number;

  id_user: number;
}
