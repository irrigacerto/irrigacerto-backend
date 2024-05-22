import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSoloDto {
  @ApiProperty()
  @IsNotEmpty()
  tipo_solo: string;

  @ApiProperty()
  @IsNotEmpty()
  capacidade_campo: number;

  @ApiProperty()
  @IsNotEmpty()
  ponto_murcha: number;

  @ApiProperty()
  @IsNotEmpty()
  densidade: number;

  @ApiProperty()
  @IsNotEmpty()
  id_propriedade: number;
}
