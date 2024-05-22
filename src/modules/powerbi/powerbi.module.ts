import { Module } from '@nestjs/common';
import { PowerbiService } from './powerbi.service';
import { PowerbiController } from './powerbi.controller';
import { PropriedadeEntity } from '@/modules/propriedade/entities/propriedade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PropriedadeEntity])],
  controllers: [PowerbiController],
  providers: [PowerbiService],
})
export class PowerbiModule {}
