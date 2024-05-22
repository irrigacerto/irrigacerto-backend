import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DadosCulturaService } from './dadoscultura.service';
import { DadosculturaController } from './dadoscultura.controller';
import { DadosCulturaEntity } from './entities/dadoscultura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DadosCulturaEntity])],
  controllers: [DadosculturaController],
  providers: [DadosCulturaService],
})
export class DadosculturaModule {}
