import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotobombaService } from './motobomba.service';
import { MotobombaController } from './motobomba.controller';
import { MotobombaEntity } from './entities/motobomba.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MotobombaEntity])],
  controllers: [MotobombaController],
  providers: [MotobombaService],
})
export class MotobombaModule {}
