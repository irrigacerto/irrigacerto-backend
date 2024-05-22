import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SistemaIrrigacaoService } from './sistemairrigacao.service';
import { SistemaIrrigacaoController } from './sistemairrigacao.controller';
import { SistemaIrrigacaoEntity } from './entities/sistemairrigacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SistemaIrrigacaoEntity])],
  controllers: [SistemaIrrigacaoController],
  providers: [SistemaIrrigacaoService],
})
export class SistemairrigacaoModule {}
