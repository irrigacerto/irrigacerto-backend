import type { Provider } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from '@/shared/services/api-config.service';
import { SmtpService } from './services/smtp/smtp.service';
import { ApiService } from './services/api/api.service';
import { ApiCron } from './services/api/api.cron';
import { PropriedadeService } from '@/modules/propriedade/propriedade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropriedadeEntity } from '@/modules/propriedade/entities/propriedade.entity';
import { EtoService } from '@/modules/eto/eto.service';
import { EtoEntity } from '@/modules/eto/entities/eto.entity';
import { CalcEntity } from '@/modules/calc/entities/calc.entity';
import { CalcService } from '@/modules/calc/calc.service';

const providers: Provider[] = [
  ApiConfigService,
  SmtpService,
  ApiService,
  ApiCron,
  PropriedadeService,
  EtoService,
  CalcService,
];

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([PropriedadeEntity]),
    TypeOrmModule.forFeature([EtoEntity]),
    TypeOrmModule.forFeature([CalcEntity]),
  ],
  providers,
  exports: [...providers],
})
export class SharedModule {}
