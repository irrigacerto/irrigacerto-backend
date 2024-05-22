import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturaService } from './cultura.service';
import { CulturaController } from './cultura.controller';
import { CulturaEntity } from './entities/cultura.entity';
import { CalcEntity } from '../calc/entities/calc.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CulturaEntity]),
    TypeOrmModule.forFeature([CalcEntity]),
  ],
  controllers: [CulturaController],
  providers: [CulturaService],
})
export class CulturaModule {}
