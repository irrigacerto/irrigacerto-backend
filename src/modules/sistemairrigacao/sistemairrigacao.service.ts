import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSistemaIrrigacaoDto } from './dto/create-sistemairrigacao.dto';
import { UpdateSistemaIrrigacaoDto } from './dto/update-sistemairrigacao.dto';
import { SistemaIrrigacaoEntity } from './entities/sistemairrigacao.entity';
import { PropriedadeEntity } from '../propriedade/entities/propriedade.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class SistemaIrrigacaoService {
  constructor(
    @InjectRepository(SistemaIrrigacaoEntity)
    private sistemairrigacaoRepository: Repository<SistemaIrrigacaoEntity>,
  ) {}

  async create(createSistemairrigacaoDto: CreateSistemaIrrigacaoDto) {
    const sistemairrigacao = this.sistemairrigacaoRepository.create(
      createSistemairrigacaoDto,
    );
    return await this.sistemairrigacaoRepository.save(sistemairrigacao);
  }

  async findAll(id_user: number) {
    return await this.sistemairrigacaoRepository
      .createQueryBuilder('sistema_irrigacao')
      .select(['sistema_irrigacao.*'])
      .innerJoin(
        PropriedadeEntity,
        'propriedade',
        'sistema_irrigacao.id_propriedade = propriedade.id_propriedade',
      )
      .innerJoin(User, 'users', 'propriedade.id_user = users.id')
      .where('users.id = :id', { id: id_user })
      .getRawMany();
  }

  async findOne(id_sistema_irrigacao: string) {
    return await this.sistemairrigacaoRepository.findOne({
      where: { id_sistema_irrigacao },
    });
  }

  async update(
    id_sistema_irrigacao: string,
    updateSistemairrigacaoDto: UpdateSistemaIrrigacaoDto,
  ) {
    await this.sistemairrigacaoRepository.update(
      id_sistema_irrigacao,
      updateSistemairrigacaoDto,
    );
    return await this.sistemairrigacaoRepository.findOne({
      where: { id_sistema_irrigacao },
    });
  }

  async remove(id_sistema_irrigacao: string) {
    const sistemairrigacao = await this.findOne(id_sistema_irrigacao);
    return await this.sistemairrigacaoRepository.remove(sistemairrigacao);
  }
}
