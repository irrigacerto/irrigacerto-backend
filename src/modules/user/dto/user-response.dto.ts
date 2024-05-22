import { Exclude, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { RolesEnum } from '@/decorators/roles.decorator';

export class UserResponseDto {
  id: string;

  nome: string;

  email: string;

  celular: string;

  cep: string;

  cidade: string;

  estado: string;

  roles: RolesEnum[];

  @Exclude()
  password: string;
}

export default class UsersResponseDto {
  @ValidateNested({ each: true })
  @Type(() => UserResponseDto)
  data?: UserResponseDto[] = [];
}
