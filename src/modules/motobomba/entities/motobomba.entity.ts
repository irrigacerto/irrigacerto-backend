import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { PropriedadeEntity } from '../../propriedade/entities/propriedade.entity';
import { CulturaEntity } from '@/modules/cultura/entities/cultura.entity';

@Entity({ name: 'motobomba', schema: 'db_irrigation_management' })
export class MotobombaEntity {
  @PrimaryGeneratedColumn()
  id_motobomba: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  fabricante: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  potencia: string;

  @Column({ type: 'float', nullable: true })
  vazao_maxima: number;

  @Column({ type: 'tinyint', nullable: true })
  ativada: boolean;

  @ManyToOne(() => PropriedadeEntity, (propriedade) => propriedade.id_motobomba)
  @JoinColumn({ name: 'id_propriedade' })
  id_propriedade: number;

  @ManyToOne(() => PropriedadeEntity, (propriedade) => propriedade.motobomba)
  @JoinColumn({ name: 'id_propriedade' })
  propriedade: PropriedadeEntity;

  @OneToMany(() => CulturaEntity, (cultura) => cultura.id_motobomba)
  id_cultura: number;

  @OneToMany(() => CulturaEntity, (cultura) => cultura.motobomba)
  cultura: CulturaEntity[];
}
