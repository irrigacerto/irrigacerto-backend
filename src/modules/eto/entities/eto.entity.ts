import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PropriedadeEntity } from '../../propriedade/entities/propriedade.entity';

@Entity({ name: 'eto', schema: 'db_irrigation_management' })
export class EtoEntity {
  @PrimaryGeneratedColumn()
  id_eto: string;

  @Column({ type: 'float' })
  eto_dia_atual: number;

  @Column({ type: 'float' })
  eto_dia_anterior: number;

  @Column({ type: 'date' })
  created_at: Date;

  @ManyToOne(() => PropriedadeEntity, (propriedade) => propriedade.id_eto)
  @JoinColumn({ name: 'id_propriedade' })
  id_propriedade: number;

  @ManyToOne(() => PropriedadeEntity, (propriedade) => propriedade.eto)
  @JoinColumn({ name: 'id_propriedade' })
  propriedade: PropriedadeEntity;
}
