import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { DadosCulturaEntity } from '../../dadoscultura/entities/dadoscultura.entity';
import { PropriedadeEntity } from '../../propriedade/entities/propriedade.entity';
import { SistemaIrrigacaoEntity } from '../../sistemairrigacao/entities/sistemairrigacao.entity';
import { MotobombaEntity } from '../../motobomba/entities/motobomba.entity';
import { SoloEntity } from '../../solo/entities/solo.entity';
import { CalcEntity } from '@/modules/calc/entities/calc.entity';

@Entity({ name: 'cultura', schema: 'db_irrigation_management' })
export class CulturaEntity {
  @PrimaryGeneratedColumn()
  id_cultura: string;

  @Column({ type: 'varchar', length: 45 })
  nome_cultura: string;

  @Column({ name: 'data_plantio', type: 'date' })
  data_plantio: Date;

  @Column({ name: 'area_plantio', type: 'float' })
  area_plantio: number;

  @Column({ name: 'estagio_colheita', type: 'int' })
  estagio_colheita: number;

  @Column({ name: 'status_cultura', type: 'int' })
  status_cultura: number;

  @ManyToOne(
    () => DadosCulturaEntity,
    (dados_cultura) => dados_cultura.id_cultura,
  )
  @JoinColumn({ name: 'id_dados_cultura' })
  id_dados_cultura: number;

  @ManyToOne(() => DadosCulturaEntity, (dados_cultura) => dados_cultura.cultura)
  @JoinColumn({ name: 'id_dados_cultura' })
  dados_cultura: DadosCulturaEntity;

  @ManyToOne(() => PropriedadeEntity, (propriedade) => propriedade.id_cultura)
  @JoinColumn({ name: 'id_propriedade' })
  id_propriedade: number;

  @ManyToOne(() => PropriedadeEntity, (propriedade) => propriedade.cultura)
  @JoinColumn({ name: 'id_propriedade' })
  propriedade: PropriedadeEntity;

  @ManyToOne(
    () => SistemaIrrigacaoEntity,
    (sistema_irrigacao) => sistema_irrigacao.id_cultura,
  )
  @JoinColumn({ name: 'id_sistema_irrigacao' })
  id_sistema_irrigacao: number;

  @ManyToOne(
    () => SistemaIrrigacaoEntity,
    (sistema_irrigacao) => sistema_irrigacao.cultura,
  )
  @JoinColumn({ name: 'id_sistema_irrigacao' })
  sistema_irrigacao: SistemaIrrigacaoEntity;

  @ManyToOne(() => MotobombaEntity, (motobomba) => motobomba.id_cultura)
  @JoinColumn({ name: 'id_motobomba' })
  id_motobomba: number;

  @ManyToOne(() => MotobombaEntity, (motobomba) => motobomba.cultura)
  @JoinColumn({ name: 'id_motobomba' })
  motobomba: MotobombaEntity;

  @ManyToOne(() => SoloEntity, (solo) => solo.id_cultura)
  @JoinColumn({ name: 'id_solo' })
  id_solo: number;

  @ManyToOne(() => SoloEntity, (solo) => solo.cultura)
  @JoinColumn({ name: 'id_solo' })
  solo: SoloEntity;

  @OneToMany(() => CalcEntity, (calc) => calc.id_cultura)
  id_calc: number;

  @OneToMany(() => CalcEntity, (calc) => calc.cultura)
  calc: CalcEntity[];
}
