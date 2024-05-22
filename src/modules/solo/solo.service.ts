import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSoloDto } from './dto/create-solo.dto';
import { UpdateSoloDto } from './dto/update-solo.dto';
import { SoloEntity } from './entities/solo.entity';
import { User } from '../user/entities/user.entity';
import { PropriedadeEntity } from '../propriedade/entities/propriedade.entity';

@Injectable()
export class SoloService {
  constructor(
    @InjectRepository(SoloEntity)
    private soloRepository: Repository<SoloEntity>,
  ) {}

  async create(createSoloDto: CreateSoloDto) {
    const solo = this.soloRepository.create(createSoloDto);
    return await this.soloRepository.save(solo);
  }

  async findAll(id_user: number) {
    return await this.soloRepository
      .createQueryBuilder('solo')
      .select(['solo.*'])
      .innerJoin(
        PropriedadeEntity,
        'propriedade',
        'solo.id_propriedade = propriedade.id_propriedade',
      )
      .innerJoin(User, 'users', 'propriedade.id_user = users.id')
      .where('users.id = :id', { id: id_user })
      .getRawMany();
  }

  async findOne(id_solo: string) {
    return await this.soloRepository.findOne({ where: { id_solo } });
  }

  async update(id_solo: string, updateSoloDto: UpdateSoloDto) {
    await this.soloRepository.update(id_solo, updateSoloDto);
    return await this.soloRepository.findOne({ where: { id_solo } });
  }

  async remove(id_solo: string) {
    const solo = await this.findOne(id_solo);
    return await this.soloRepository.remove(solo);
  }
}
