import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RolesEnum } from '@/decorators/roles.decorator';
import { PropriedadeEntity } from '@/modules/propriedade/entities/propriedade.entity';

@Entity({ name: 'users', schema: 'db_irrigation_management' })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 45 })
  nome: string;

  @Column({ type: 'varchar', length: 45 })
  email: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  celular: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  cep: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  cidade: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  estado: string;

  @Column({ type: 'varchar', length: 250 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reset_password_token: string;

  @Column({ type: 'timestamp', nullable: true })
  reset_password_expires: Date;

  @Column({
    type: 'json',
    default: `["${RolesEnum.USER}"]`,
  })
  roles: RolesEnum[];

  @OneToMany(() => PropriedadeEntity, (propriedade) => propriedade.id_user)
  id_propriedade: number;

  @OneToMany(() => PropriedadeEntity, (propriedade) => propriedade.user)
  propriedade: PropriedadeEntity[];
}
