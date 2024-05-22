import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEtoDto } from './dto/create-eto.dto';
import { EtoEntity } from './entities/eto.entity';
import { PropriedadeEntity } from '../propriedade/entities/propriedade.entity';

@Injectable()
export class EtoService {
  constructor(
    @InjectRepository(EtoEntity)
    private etoRepository: Repository<EtoEntity>,
  ) {}

  async create(CreateEtoDto: CreateEtoDto) {
    const eto = this.etoRepository.create(CreateEtoDto);
    return await this.etoRepository.save(eto);
  }

  async findAll() {
    return await this.etoRepository
      .createQueryBuilder('eto')
      .select(['eto.*'])
      .innerJoin(
        PropriedadeEntity,
        'propriedade',
        'eto.id_propriedade = propriedade.id_propriedade',
      )
      .getRawMany();
  }
}
