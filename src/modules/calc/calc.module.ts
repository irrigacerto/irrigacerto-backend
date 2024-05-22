import { Module } from '@nestjs/common';
import { CalcService } from './calc.service';
import { CalcController } from './calc.controller';
import { LocalizadaService } from '@/utils/math/localizada.service';
import { CalcCron } from './calc.cron';
import { PropriedadeService } from '../propriedade/propriedade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropriedadeEntity } from '@/modules/propriedade/entities/propriedade.entity';
import { CulturaEntity } from '../cultura/entities/cultura.entity';
import { CalcEntity } from './entities/calc.entity';
import { LocalizadaPrimeiroDiaService } from '@/utils/math/localizadaPrimeiroDia.service';
import { AsperssaoService } from '@/utils/math/asperssao.service';
import { AsperssaoPrimeiroDiaService } from '@/utils/math/asperssaoPrimeiroDia.service';
import { CulturaService } from '../cultura/cultura.service';
import { OneSignalService } from './onesignal.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PropriedadeEntity]),
    TypeOrmModule.forFeature([CulturaEntity]),
    TypeOrmModule.forFeature([CalcEntity]),
  ],
  controllers: [CalcController],
  providers: [
    PropriedadeService,
    CalcService,
    LocalizadaService,
    CalcCron,
    LocalizadaPrimeiroDiaService,
    AsperssaoService,
    AsperssaoPrimeiroDiaService,
    CulturaService,
    OneSignalService,
  ],
})
export class CalcModule {}
