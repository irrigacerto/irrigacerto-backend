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

@Entity({ name: 'sistema_irrigacao', schema: 'db_irrigation_management' })
export class SistemaIrrigacaoEntity {
  @PrimaryGeneratedColumn()
  id_sistema_irrigacao: string;

  @Column({ type: 'varchar', length: 45 })
  nome: string;

  @Column({ type: 'int' })
  quantidade_setores: number;

  @Column({ type: 'int' })
  tipo_irrigacao: number;

  @Column({ type: 'float' })
  area_irrigada: number;

  @Column({ type: 'float' })
  espacamento_linha: number;

  @Column({ type: 'float' })
  coeficiente_uniformidade: number;

  @Column({ type: 'float' })
  eficiencia_sistema: number;

  @Column({ type: 'float', nullable: true })
  vazao_asperssor: number;

  @Column({ type: 'float', nullable: true })
  espacamento_asperssor: number;

  @Column({ type: 'float', nullable: true })
  vazao_emissor: number;

  @Column({ type: 'float', nullable: true })
  espacamento_emissor: number;

  @Column({ type: 'float', nullable: true })
  percentual_area_molhada: number;

  @Column({ type: 'float', nullable: true })
  percentual_area_sombreada: number;

  @Column({ type: 'tinyint', nullable: true })
  ativo: boolean;

  @ManyToOne(
    () => PropriedadeEntity,
    (propriedade) => propriedade.id_sistema_irrigacao,
  )
  @JoinColumn({ name: 'id_propriedade' })
  id_propriedade: number;

  @ManyToOne(
    () => PropriedadeEntity,
    (propriedade) => propriedade.sistema_irrigacao,
  )
  @JoinColumn({ name: 'id_propriedade' })
  propriedade: PropriedadeEntity;

  @OneToMany(() => CulturaEntity, (cultura) => cultura.id_sistema_irrigacao)
  id_cultura: number;

  @OneToMany(() => CulturaEntity, (cultura) => cultura.sistema_irrigacao)
  cultura: CulturaEntity[];
}
