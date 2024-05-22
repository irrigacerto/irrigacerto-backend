import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropriedadeDto {
  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  latitude: string;

  @ApiProperty()
  @IsNotEmpty()
  longitude: string;

  @ApiProperty()
  @IsNotEmpty()
  cidade: string;

  @ApiProperty()
  @IsNotEmpty()
  estado: string;

  @ApiProperty()
  @IsNotEmpty()
  cep: string;

  @ApiProperty()
  @IsNotEmpty()
  area_propriedade: number;

  @ApiProperty()
  @IsNotEmpty()
  precipitacao: number;

  id_user: number;
}
