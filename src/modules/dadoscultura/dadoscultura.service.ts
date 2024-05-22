import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDadosCulturaDto } from '../dadoscultura/dto/create-dadoscultura.dto';
import { UpdateDadosCulturaDto } from '../dadoscultura/dto/update-dadoscultura.dto';
import { DadosCulturaEntity } from './entities/dadoscultura.entity';

@Injectable()
export class DadosCulturaService {
  constructor(
    @InjectRepository(DadosCulturaEntity)
    private dadosCulturaRepository: Repository<DadosCulturaEntity>,
  ) {}

  async create(createDadosCulturaDto: CreateDadosCulturaDto) {
    const dadosCultura = this.dadosCulturaRepository.create(
      createDadosCulturaDto,
    );
    return await this.dadosCulturaRepository.save(dadosCultura);
  }

  async findAll() {
    return await this.dadosCulturaRepository.find();
  }

  async findOne(id_dados_cultura: string) {
    return await this.dadosCulturaRepository.findOne({
      where: { id_dados_cultura },
    });
  }

  async update(
    id_dados_cultura: string,
    updateDadosCulturaDto: UpdateDadosCulturaDto,
  ) {
    await this.dadosCulturaRepository.update(
      id_dados_cultura,
      updateDadosCulturaDto,
    );
    return await this.dadosCulturaRepository.findOne({
      where: { id_dados_cultura },
    });
  }

  async remove(id_dados_cultura: string) {
    const dadosCultura = await this.findOne(id_dados_cultura);
    return await this.dadosCulturaRepository.remove(dadosCultura);
  }
}
