import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropriedadeEntity } from '../propriedade/entities/propriedade.entity';

@Injectable()
export class PowerbiService {
  constructor(
    @InjectRepository(PropriedadeEntity)
    private propriedadeRepository: Repository<PropriedadeEntity>,
  ) {}

  async findAllDataBI() {
    return await this.propriedadeRepository
      .createQueryBuilder('propriedade')
      .leftJoinAndSelect('propriedade.user', 'user')
      .leftJoinAndSelect('propriedade.cultura', 'cultura')
      .leftJoinAndSelect('cultura.dados_cultura', 'dados_cultura')
      .leftJoinAndSelect('cultura.solo', 'solo')
      .leftJoinAndSelect('cultura.motobomba', 'motobomba')
      .leftJoinAndSelect('cultura.sistema_irrigacao', 'sistema_irrigacao')
      .leftJoinAndSelect('cultura.calc', 'calc')
      .getMany();
  }
}
