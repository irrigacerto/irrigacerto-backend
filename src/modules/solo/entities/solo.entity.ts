import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PropriedadeEntity } from '../../propriedade/entities/propriedade.entity';
import { CulturaEntity } from '@/modules/cultura/entities/cultura.entity';

@Entity({ name: 'solo', schema: 'db_irrigation_management' })
export class SoloEntity {
  @PrimaryGeneratedColumn()
  id_solo: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  tipo_solo: string;

  @Column({ type: 'float', nullable: true })
  capacidade_campo: number;

  @Column({ type: 'float', nullable: true })
  ponto_murcha: number;

  @Column({ type: 'float', nullable: true })
  densidade: number;

  @ManyToOne(() => PropriedadeEntity, (propriedade) => propriedade.id_solo)
  @JoinColumn({ name: 'id_propriedade' })
  id_propriedade: number;

  @ManyToOne(() => PropriedadeEntity, (propriedade) => propriedade.solo)
  @JoinColumn({ name: 'id_propriedade' })
  propriedade: PropriedadeEntity;

  @OneToMany(() => CulturaEntity, (cultura) => cultura.id_solo)
  id_cultura: number;

  @OneToMany(() => CulturaEntity, (cultura) => cultura.solo)
  cultura: CulturaEntity[];
}
