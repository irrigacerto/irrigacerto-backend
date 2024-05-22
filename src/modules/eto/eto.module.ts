import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtoService } from './eto.service';
import { EtoController } from './eto.controller';
import { EtoEntity } from './entities/eto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EtoEntity])],
  controllers: [EtoController],
  providers: [EtoService],
})
export class EtoModule {}
