import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCalcDto } from './dto/create-calc.dto';
import { CalcEntity } from './entities/calc.entity';
import { CulturaEntity } from '../cultura/entities/cultura.entity';
import { UpdateCalcDto } from './dto/update-calc.dto';

@Injectable()
export class CalcService {
  constructor(
    @InjectRepository(CalcEntity)
    private calcRepository: Repository<CalcEntity>,
  ) {}

  async create(CreateCalcDto: CreateCalcDto) {
    const calc = this.calcRepository.create(CreateCalcDto);
    return await this.calcRepository.save(calc);
  }

  async update(id_calc: string, updateCalcDto: UpdateCalcDto) {
    await this.calcRepository.update(id_calc, updateCalcDto);
    return await this.calcRepository.findOne({ where: { id_calc } });
  }

  async findAll() {
    return await this.calcRepository
      .createQueryBuilder('calc')
      .select(['calc.*'])
      .innerJoin(
        CulturaEntity,
        'cultura',
        'calc.id_cultura = cultura.id_cultura',
      )
      .getRawMany();
  }

  async updateVolume(): Promise<void> {
    await this.calcRepository.query(`
      UPDATE calc AS c1
      SET volume_aplicado_area_total = (
              SELECT volume_aplicado_area_total
              FROM calc AS c2
              WHERE c2.calc_id = c1.calc_id
                AND volume_aplicado_area_total <> 0
              LIMIT 1
          ),
          volume_aplicado_setor = (
              SELECT volume_aplicado_setor
              FROM calc AS c2
              WHERE c2.calc_id = c1.calc_id
                AND volume_aplicado_setor <> 0
              LIMIT 1
          )
      WHERE (volume_aplicado_area_total = 0 OR volume_aplicado_setor = 0)
        AND EXISTS (
            SELECT 1
            FROM calc AS c3
            WHERE c3.calc_id = c1.calc_id
            HAVING COUNT(*) > 1
        );
    `);
  }
}
