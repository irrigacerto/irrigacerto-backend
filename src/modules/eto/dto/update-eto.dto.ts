import { PartialType } from '@nestjs/mapped-types';
import { CreateEtoDto } from './create-eto.dto';

export class UpdateEtoDto extends PartialType(CreateEtoDto) {
  eto_dia_atual?: number;
  eto_dia_anterior?: number;
  created_at?: Date;
  id_propriedade?: number;
}
