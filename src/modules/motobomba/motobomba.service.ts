import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMotobombaDto } from './dto/create-motobomba.dto';
import { UpdateMotobombaDto } from './dto/update-motobomba.dto';
import { MotobombaEntity } from './entities/motobomba.entity';
import { User } from '../user/entities/user.entity';
import { PropriedadeEntity } from '../propriedade/entities/propriedade.entity';

@Injectable()
export class MotobombaService {
  constructor(
    @InjectRepository(MotobombaEntity)
    private motobombaRepository: Repository<MotobombaEntity>,
  ) {}

  async create(createMotobombaDto: CreateMotobombaDto) {
    const motobomba = this.motobombaRepository.create(createMotobombaDto);
    return await this.motobombaRepository.save(motobomba);
  }

  async findAll(id_user: number) {
    return await this.motobombaRepository
      .createQueryBuilder('motobomba')
      .select(['motobomba.*'])
      .innerJoin(
        PropriedadeEntity,
        'propriedade',
        'motobomba.id_propriedade = propriedade.id_propriedade',
      )
      .innerJoin(User, 'users', 'propriedade.id_user = users.id')
      .where('users.id = :id', { id: id_user })
      .getRawMany();
  }

  async findOne(id_motobomba: string) {
    return await this.motobombaRepository.findOne({ where: { id_motobomba } });
  }

  // async update(id_motobomba: string, updateMotobombaDto: UpdateMotobombaDto) {
  //   const motobomba = await this.motobombaRepository.findOne({ where: { id_motobomba } });
  //   Object.assign(motobomba, updateMotobombaDto);
  //   return this.motobombaRepository.save(motobomba);
  // }

  async update(id_motobomba: string, updateMotobombaDto: UpdateMotobombaDto) {
    await this.motobombaRepository.update(id_motobomba, updateMotobombaDto);
    return await this.motobombaRepository.findOne({ where: { id_motobomba } });
  }

  async remove(id_motobomba: string) {
    const motobomba = await this.findOne(id_motobomba);
    return await this.motobombaRepository.remove(motobomba);
  }
}
