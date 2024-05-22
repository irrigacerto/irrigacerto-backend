import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CulturaEntity } from '@/modules/cultura/entities/cultura.entity';

@Entity({ name: 'dados_cultura', schema: 'db_irrigation_management' })
export class DadosCulturaEntity {
  @PrimaryGeneratedColumn()
  id_dados_cultura: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  nome: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  segmento: string;

  @Column({ type: 'tinyint', nullable: true })
  perene: boolean;

  @Column({ type: 'tinyint', nullable: true })
  temporaria: boolean;

  @Column({ type: 'float', nullable: true })
  profundidade_sistema_radicular: number;

  @Column({ type: 'float', nullable: true })
  fator: number;

  @Column({ type: 'float', nullable: true })
  estagio1: number;

  @Column({ type: 'int', nullable: true })
  duracao_estagio1: number;

  @Column({ type: 'float', nullable: true })
  estagio2: number;

  @Column({ type: 'int', nullable: true })
  duracao_estagio2: number;

  @Column({ type: 'float', nullable: true })
  estagio3: number;

  @Column({ type: 'int', nullable: true })
  duracao_estagio3: number;

  @Column({ type: 'float', nullable: true })
  estagio4: number;

  @Column({ type: 'int', nullable: true })
  duracao_estagio4: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  image_url: string;

  @OneToMany(() => CulturaEntity, (cultura) => cultura.id_dados_cultura)
  id_cultura: number;

  @OneToMany(() => CulturaEntity, (cultura) => cultura.dados_cultura)
  cultura: CulturaEntity[];
}
