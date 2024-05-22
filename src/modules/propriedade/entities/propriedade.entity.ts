import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { SoloEntity } from '@/modules/solo/entities/solo.entity';
import { CulturaEntity } from '@/modules/cultura/entities/cultura.entity';
import { MotobombaEntity } from '@/modules/motobomba/entities/motobomba.entity';
import { SistemaIrrigacaoEntity } from '@/modules/sistemairrigacao/entities/sistemairrigacao.entity';
import { EtoEntity } from '@/modules/eto/entities/eto.entity';

@Entity({ name: 'propriedade', schema: 'db_irrigation_management' })
export class PropriedadeEntity {
  @PrimaryGeneratedColumn()
  id_propriedade: string;

  @Column({ type: 'varchar', length: 45 })
  nome: string;

  @Column({ type: 'varchar', length: 45 })
  latitude: string;

  @Column({ type: 'varchar', length: 45 })
  longitude: string;

  @Column({ type: 'varchar', length: 45 })
  cidade: string;

  @Column({ type: 'varchar', length: 45 })
  estado: string;

  @Column({ type: 'varchar', length: 45 })
  cep: string;

  @Column({ type: 'float' })
  area_propriedade: number;

  @Column({ type: 'float' })
  precipitacao: number;

  @ManyToOne(() => User, (user) => user.id_propriedade)
  @JoinColumn({ name: 'id_user' })
  id_user: number;

  @ManyToOne(() => User, (user) => user.propriedade)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => SoloEntity, (solo) => solo.id_propriedade)
  id_solo: number;

  @OneToMany(() => SoloEntity, (solo) => solo.propriedade)
  solo: SoloEntity[];

  @OneToMany(() => CulturaEntity, (cultura) => cultura.id_propriedade)
  id_cultura: number;

  @OneToMany(() => CulturaEntity, (cultura) => cultura.propriedade)
  cultura: CulturaEntity[];

  @OneToMany(() => MotobombaEntity, (motobomba) => motobomba.id_propriedade)
  id_motobomba: number;

  @OneToMany(() => MotobombaEntity, (motobomba) => motobomba.propriedade)
  motobomba: MotobombaEntity[];

  @OneToMany(() => EtoEntity, (eto) => eto.id_propriedade)
  id_eto: number;

  @OneToMany(() => EtoEntity, (eto) => eto.propriedade)
  eto: EtoEntity[];

  @OneToMany(
    () => SistemaIrrigacaoEntity,
    (sistema_irrigacao) => sistema_irrigacao.id_propriedade,
  )
  id_sistema_irrigacao: number;

  @OneToMany(
    () => SistemaIrrigacaoEntity,
    (sistema_irrigacao) => sistema_irrigacao.propriedade,
  )
  sistema_irrigacao: SistemaIrrigacaoEntity[];
}
