import { PartialType } from '@nestjs/mapped-types';
import { CreateMotobombaDto } from './create-motobomba.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMotobombaDto extends PartialType(CreateMotobombaDto) {
  @ApiPropertyOptional()
  fabricante?: string;

  @ApiPropertyOptional()
  potencia?: string;

  @ApiPropertyOptional()
  vazao_maxima?: number;

  @ApiPropertyOptional()
  ativada?: boolean;

  @ApiPropertyOptional()
  id_propriedade?: number;
}
