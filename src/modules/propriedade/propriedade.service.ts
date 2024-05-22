import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropriedadeDto } from './dto/create-propriedade.dto';
import { UpdatePropriedadeDto } from './dto/update-propriedade.dto';
import { PropriedadeEntity } from './entities/propriedade.entity';
import { CulturaEntity } from '../cultura/entities/cultura.entity';
import { DadosCulturaEntity } from '../dadoscultura/entities/dadoscultura.entity';
import { SoloEntity } from '../solo/entities/solo.entity';
import { MotobombaEntity } from '../motobomba/entities/motobomba.entity';
import { SistemaIrrigacaoEntity } from '../sistemairrigacao/entities/sistemairrigacao.entity';
import { EtoEntity } from '../eto/entities/eto.entity';
import { CalcEntity } from '../calc/entities/calc.entity';

@Injectable()
export class PropriedadeService {
  constructor(
    @InjectRepository(PropriedadeEntity)
    private propriedadeRepository: Repository<PropriedadeEntity>,
  ) {}

  async findAllCalcCulture(id_user: number) {
    const currentDate = new Date();

    const results = await this.propriedadeRepository
      .createQueryBuilder('propriedade')
      .select([
        'cultura.nome_cultura AS nome_cultura',
        'cultura.data_plantio AS data_plantio',
        'cultura.estagio_colheita AS estagio_colheita',
        'propriedade.precipitacao AS precipitacao',
        'calc.tempo_irrigacao_sugerido_area_total AS tempo_irrigacao_sugerido_area_total',
        'calc.volume_aplicado_area_total AS volume_aplicado_area_total',
        'calc.tempo_irrigacao_sugerido_area_setor AS tempo_irrigacao_sugerido_area_setor',
        'calc.volume_aplicado_setor AS volume_aplicado_setor',
        'calc.excesso_deficit AS excesso_deficit',
        'calc.created_at AS data',
        'cultura.status_cultura AS status_cultura',
        'cultura.id_cultura AS id_cultura',
        'dados_cultura.image_url AS image_url',
        'calc.decisao AS status_solo',
      ])
      .leftJoin(
        CulturaEntity,
        'cultura',
        'propriedade.id_propriedade = cultura.id_propriedade',
      )
      .leftJoin(
        DadosCulturaEntity,
        'dados_cultura',
        'dados_cultura.id_dados_cultura = cultura.id_dados_cultura',
      )
      .leftJoin(CalcEntity, 'calc', 'calc.id_cultura = cultura.id_cultura')
      .where(
        'calc.tipo_calculo = "visualization" AND ' +
          'propriedade.id_propriedade IS NOT NULL AND ' +
          'cultura.id_cultura IS NOT NULL AND ' +
          'calc.id_calc IS NOT NULL AND id_user = :id_user AND ' +
          'DATE(calc.created_at) = DATE(:currentDate)',
        { id_user, currentDate },
      )
      .getRawMany();

    const resultsWithStatus = results.map((result) => ({
      ...result,
      tempo_irrigacao_sugerido_area_total:
        result.status_solo == 'Não Irrigar'
          ? '00:00:00'
          : result.tempo_irrigacao_sugerido_area_total,
      tempo_irrigacao_sugerido_area_setor:
        result.status_solo == 'Não Irrigar'
          ? '00:00:00'
          : result.tempo_irrigacao_sugerido_area_setor,
      volume_aplicado_area_total:
        result.status_solo == 'Não Irrigar'
          ? 0
          : result.volume_aplicado_area_total,
      volume_aplicado_setor:
        result.status_solo == 'Não Irrigar' ? 0 : result.volume_aplicado_setor,
    }));

    return resultsWithStatus;
  }

  async findAllCalcProperty() {
    return await this.propriedadeRepository
      .createQueryBuilder('propriedade')
      .select(['propriedade.*', 'cultura.*', 'calc.*'])
      .leftJoin(
        CulturaEntity,
        'cultura',
        'propriedade.id_propriedade = cultura.id_propriedade',
      )
      .leftJoin(CalcEntity, 'calc', 'calc.id_cultura = cultura.id_cultura')
      .where(
        'propriedade.id_propriedade IS NOT NULL AND cultura.id_cultura IS NOT NULL',
      )
      .getRawMany();
  }

  async findCoordinatesProperty() {
    return await this.propriedadeRepository
      .createQueryBuilder('propriedade')
      .select([
        'propriedade.id_propriedade AS id',
        'propriedade.latitude AS latitude',
        'propriedade.longitude AS longitude',
      ])
      .getRawMany();
  }

  async findAllDataCalc() {
    const currentDate = new Date();
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);

    return await this.propriedadeRepository
      .createQueryBuilder('propriedade')
      .select([
        'propriedade.*',
        'cultura.*',
        'solo.*',
        'motobomba.*',
        'dados_cultura.*',
        'sistema_irrigacao.*',
        'eto.*',
        'calc.*',
      ])
      .leftJoin(
        CulturaEntity,
        'cultura',
        'propriedade.id_propriedade = cultura.id_propriedade',
      )
      .leftJoin(
        EtoEntity,
        'eto',
        'eto.id_propriedade = propriedade.id_propriedade',
      )
      .leftJoin(
        DadosCulturaEntity,
        'dados_cultura',
        'cultura.id_dados_cultura = dados_cultura.id_dados_cultura',
      )
      .leftJoin(SoloEntity, 'solo', 'cultura.id_solo = solo.id_solo')
      .leftJoin(
        MotobombaEntity,
        'motobomba',
        'cultura.id_motobomba = motobomba.id_motobomba',
      )
      .leftJoin(
        SistemaIrrigacaoEntity,
        'sistema_irrigacao',
        'cultura.id_sistema_irrigacao = sistema_irrigacao.id_sistema_irrigacao',
      )
      .leftJoin(CalcEntity, 'calc', 'calc.id_cultura = cultura.id_cultura')
      .where(
        'calc.decisao = "Não Irrigar" AND ' +
          'solo.id_solo IS NOT NULL AND ' +
          'motobomba.id_motobomba IS NOT NULL AND ' +
          'sistema_irrigacao.id_sistema_irrigacao IS NOT NULL AND ' +
          'DATE(eto.created_at) = DATE(:currentDate) AND ' +
          'DATE(calc.created_at) = DATE(:previousDate)',
        { currentDate, previousDate },
      )
      .getRawMany();
  }

  async findAll(id_user: number) {
    return await this.propriedadeRepository
      .createQueryBuilder('propriedade')
      .where('id_user = :id', { id: id_user })
      .getMany();
  }

  async findAllPropertyData(id_user: number) {
    return await this.propriedadeRepository
      .createQueryBuilder('propriedade')
      .leftJoinAndSelect('propriedade.user', 'user')
      .leftJoinAndSelect('propriedade.cultura', 'cultura')
      .leftJoinAndSelect('cultura.dados_cultura', 'dados_cultura')
      .leftJoinAndSelect('cultura.solo', 'solo')
      .leftJoinAndSelect('cultura.motobomba', 'motobomba')
      .leftJoinAndSelect('cultura.sistema_irrigacao', 'sistema_irrigacao')
      .where('user.id = :id', { id: id_user })
      .getMany();
  }

  async findAllPropertyItems(id_user: number) {
    return await this.propriedadeRepository
      .createQueryBuilder('propriedade')
      .leftJoinAndSelect('propriedade.user', 'user')
      .leftJoinAndSelect('propriedade.solo', 'solo')
      .leftJoinAndSelect('propriedade.motobomba', 'motobomba')
      .leftJoinAndSelect('propriedade.sistema_irrigacao', 'sistema_irrigacao')
      .where('user.id = :id', { id: id_user })
      .getMany();
  }

  async create(createPropriedadeDto: CreatePropriedadeDto) {
    const propriedade = this.propriedadeRepository.create(createPropriedadeDto);
    return await this.propriedadeRepository.save(propriedade);
  }

  async findOne(id_propriedade: string) {
    const propriedade = await this.propriedadeRepository.findOne({
      where: { id_propriedade },
    });

    if (!propriedade) {
      throw new NotFoundException(
        `Propriedade #${id_propriedade} não encontrada`,
      );
    }

    return propriedade;
  }

  async findOneGuard(id_propriedade: string) {
    const propriedade = this.propriedadeRepository
      .createQueryBuilder('propriedade')
      .where('propriedade.id_propriedade = :id_propriedade', { id_propriedade })
      .leftJoinAndSelect('propriedade.id_user', 'id_user')
      .getOne();

    if (!propriedade) {
      throw new NotFoundException(
        `Propriedade #${id_propriedade} não encontrada`,
      );
    }

    return propriedade;
  }

  async update(
    id_propriedade: string,
    updatePropriedadeDto: UpdatePropriedadeDto,
  ) {
    const propriedade = await this.findOne(id_propriedade);

    if (!propriedade) {
      throw new NotFoundException(
        `Propriedade #${id_propriedade} não encontrada`,
      );
    }

    const updatedPropriedade = Object.assign(propriedade, updatePropriedadeDto);
    await this.propriedadeRepository.save(updatedPropriedade);

    return updatedPropriedade;
  }

  async updatePrecipitacao() {
    try {
      await this.propriedadeRepository.update({}, { precipitacao: 0 });
    } catch (error) {
      console.error('Erro ao atualizar a precipitação:', error);
    }
  }

  async remove(id_propriedade: string) {
    const propriedade = await this.findOne(id_propriedade);

    if (!propriedade) {
      throw new NotFoundException(
        `Propriedade #${id_propriedade} não encontrada`,
      );
    }

    return await this.propriedadeRepository.remove(propriedade);
  }
}
