import { IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCulturaDto {
  @ApiProperty()
  @IsNotEmpty()
  nome_cultura: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  data_plantio: Date;

  @ApiProperty()
  @IsNotEmpty()
  area_plantio: number;

  @ApiProperty()
  @IsNotEmpty()
  estagio_colheita: number;

  status_cultura: number;

  @ApiProperty()
  @IsNotEmpty()
  id_dados_cultura: number;

  @ApiProperty()
  @IsNotEmpty()
  id_propriedade: number;

  @ApiProperty()
  @IsNotEmpty()
  id_sistema_irrigacao: number;

  @ApiProperty()
  @IsNotEmpty()
  id_motobomba: number;

  @ApiProperty()
  @IsNotEmpty()
  id_solo: number;
}
