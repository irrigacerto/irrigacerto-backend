import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCulturaDto } from './dto/create-cultura.dto';
import { UpdateCulturaDto } from './dto/update-cultura.dto';
import { CulturaEntity } from './entities/cultura.entity';
import { PropriedadeEntity } from '../propriedade/entities/propriedade.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CulturaService {
  constructor(
    @InjectRepository(CulturaEntity)
    private culturaRepository: Repository<CulturaEntity>,
  ) {}

  async create(createCulturaDto: CreateCulturaDto) {
    const cultura = this.culturaRepository.create(createCulturaDto);
    return await this.culturaRepository.save(cultura);
  }

  async findAll(id_user: number) {
    return await this.culturaRepository
      .createQueryBuilder('cultura')
      .select(['cultura.*'])
      .innerJoin(
        PropriedadeEntity,
        'propriedade',
        'cultura.id_propriedade = propriedade.id_propriedade',
      )
      .innerJoin(User, 'users', 'propriedade.id_user = users.id')
      .where('users.id = :id', { id: id_user })
      .getRawMany();
  }

  async findOne(id_cultura: string) {
    return await this.culturaRepository.findOne({ where: { id_cultura } });
  }

  async update(id_cultura: string, updateCulturaDto: UpdateCulturaDto) {
    const cultura = await this.culturaRepository.findOne({
      where: { id_cultura },
    });
    Object.assign(cultura, updateCulturaDto);
    return this.culturaRepository.save(cultura);
  }

  async updateStatusCultura(id_cultura) {
    try {
      const filter = { id_cultura: id_cultura };
      const update = { status_cultura: 0 };
      await this.culturaRepository.update(filter, update);
    } catch (error) {
      console.error('Erro ao atualizar o status da cultura:', error);
    }
  }

  async updateEstagioCultura(id_cultura, estagioColheita) {
    try {
      const filter = { id_cultura: id_cultura };
      const update = { estagio_colheita: estagioColheita };
      await this.culturaRepository.update(filter, update);
    } catch (error) {
      console.error('Erro ao atualizar o estágio:', error);
    }
  }

  async remove(id_cultura: string) {
    const cultura = await this.findOne(id_cultura);
    return await this.culturaRepository.remove(cultura);
  }
}
