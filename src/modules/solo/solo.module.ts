import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoloService } from './solo.service';
import { SoloController } from './solo.controller';
import { SoloEntity } from './entities/solo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SoloEntity])],
  controllers: [SoloController],
  providers: [SoloService],
})
export class SoloModule {}
