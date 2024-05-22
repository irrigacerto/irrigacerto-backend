import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropriedadeService } from './propriedade.service';
import { PropriedadeController } from './propriedade.controller';
import { PropriedadeEntity } from '@/modules/propriedade/entities/propriedade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropriedadeEntity])],
  controllers: [PropriedadeController],
  providers: [PropriedadeService],
})
export class PropriedadeModule {}
