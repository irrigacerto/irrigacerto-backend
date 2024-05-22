import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CulturaEntity } from '@/modules/cultura/entities/cultura.entity';

@Entity({ name: 'calc', schema: 'db_irrigation_management' })
export class CalcEntity {
  @PrimaryGeneratedColumn()
  id_calc: string;

  @Column({ type: 'float', nullable: true })
  armazenamento_inicial_primeiro_dia: number;

  @Column({ type: 'float', nullable: true })
  total_dias_estagio: number;

  @Column({ type: 'float', nullable: true })
  armazenamento_final_dia_anterior: number;

  @Column({ type: 'float', nullable: true })
  lamina_liquida_previa_dia_anterior: number;

  @Column({ type: 'float', nullable: true })
  percentual_area_sombreada_previa: number;

  @Column({ type: 'float', nullable: true })
  percentual_area_sombreada_corrigida: number;

  @Column({ type: 'float', nullable: true })
  ponto_murcha_calculado: number;

  @Column({ type: 'float', nullable: true })
  capacidade_campo_calculado: number;

  @Column({ type: 'float', nullable: true })
  umidade_critica_percentual: number;

  @Column({ type: 'float', nullable: true })
  umidade_critica: number;

  @Column({ type: 'float', nullable: true })
  disponibilidade_total_agua: number;

  @Column({ type: 'float', nullable: true })
  lamina_armazenamento: number;

  @Column({ type: 'float', nullable: true })
  lamina_armazenada: number;

  @Column({ type: 'float', nullable: true })
  ks: number;

  @Column({ type: 'float', nullable: true })
  kc_ajustado: number;

  @Column({ type: 'float', nullable: true })
  kc_limite: number;

  @Column({ type: 'float', nullable: true })
  etc_dia_atual_cultura: number;

  @Column({ type: 'float', nullable: true })
  etc_dia_atual_cultura_corrigida: number;

  @Column({ type: 'float', nullable: true })
  lamina_liquida_sem_correcao: number;

  @Column({ type: 'float', nullable: true })
  lamina_liquida: number;

  @Column({ type: 'float', nullable: true })
  lamina_bruta: number;

  @Column({ type: 'float', nullable: true })
  intensidade_aplicacao: number;

  @Column({ type: 'float', nullable: true })
  tempo_irrigacao: number;

  @Column({ type: 'float', nullable: true })
  lamina_total: number;

  @Column({ type: 'float', nullable: true })
  agua_facilmente_disponivel: number;

  @Column({ type: 'float', nullable: true })
  armazenamento_inicial_dia_atual: number;

  @Column({ type: 'float', nullable: true })
  armazenamento_final_dia_atual: number;

  @Column({ type: 'float', nullable: true })
  excesso_deficit: number;

  @Column({ type: 'float', nullable: true })
  quantidade_total_agua: number;

  @Column({ type: 'float', nullable: true })
  volume_aplicado_area_total: number;

  @Column({ type: 'float', nullable: true })
  volume_aplicado_setor: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  tempo_irrigacao_sugerido_area_total: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  tempo_irrigacao_sugerido_area_setor: string;

  @Column({ type: 'date' })
  created_at: Date;

  @Column({ type: 'int', nullable: true })
  primeiro_calculo: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  decisao: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  tipo_calculo: string;

  @Column({ type: 'int', nullable: true })
  calc_id: number;

  @ManyToOne(() => CulturaEntity, (cultura) => cultura.id_calc)
  @JoinColumn({ name: 'id_cultura' })
  id_cultura: number;

  @ManyToOne(() => CulturaEntity, (cultura) => cultura.calc)
  @JoinColumn({ name: 'id_cultura' })
  cultura: CulturaEntity;
}
