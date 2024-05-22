import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@/shared/shared.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { DatabaseFactoryService } from '@/database/database-factory.service';
import { ApiConfigService } from '@/shared/services/api-config.service';
import { RedisModuleAsyncOptions } from '@liaoliaots/nestjs-redis/dist/redis/interfaces';
import { PropriedadeModule } from './modules/propriedade/propriedade.module';
import { CulturaModule } from './modules/cultura/cultura.module';
import { MotobombaModule } from './modules/motobomba/motobomba.module';
import { SoloModule } from './modules/solo/solo.module';
import { SistemairrigacaoModule } from './modules/sistemairrigacao/sistemairrigacao.module';
import { DadosculturaModule } from './modules/dadoscultura/dadoscultura.module';
import { AsperssaoService } from './utils/math/asperssao.service';
import { LocalizadaService } from './utils/math/localizada.service';
import { CalcModule } from './modules/calc/calc.module';
import { ScheduleModule } from '@nestjs/schedule/dist';
import { EtoModule } from './modules/eto/eto.module';
import UserModule from '@/modules/user/user.module';
import AuthModule from '@/modules/auth/auth.module';
import { LocalizadaPrimeiroDiaService } from './utils/math/localizadaPrimeiroDia.service';
import { AsperssaoPrimeiroDiaService } from './utils/math/asperssaoPrimeiroDia.service';
import { PowerbiModule } from './modules/powerbi/powerbi.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseFactoryService,
      imports: [SharedModule],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        config: {
          url: configService.getString('REDIS_URL'),
        },
      }),
      inject: [ApiConfigService],
    } as RedisModuleAsyncOptions),
    UserModule,
    AuthModule,
    PropriedadeModule,
    CulturaModule,
    MotobombaModule,
    SoloModule,
    SistemairrigacaoModule,
    DadosculturaModule,
    CalcModule,
    ScheduleModule.forRoot(),
    EtoModule,
    PowerbiModule,
  ],
  providers: [
    AsperssaoService,
    LocalizadaService,
    AsperssaoPrimeiroDiaService,
    LocalizadaPrimeiroDiaService,
  ],
})
export default class AppModule {}
