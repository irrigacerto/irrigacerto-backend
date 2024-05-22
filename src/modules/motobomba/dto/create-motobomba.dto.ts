import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMotobombaDto {
  @ApiPropertyOptional()
  @IsOptional()
  fabricante: string;

  @ApiPropertyOptional()
  @IsOptional()
  potencia: string;

  @ApiPropertyOptional()
  @IsOptional()
  vazao_maxima: number;

  @ApiPropertyOptional()
  @IsOptional()
  ativada: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  id_propriedade: number;
}
