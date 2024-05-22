import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiService } from './api.service';
import { PropriedadeService } from '@/modules/propriedade/propriedade.service';

@Injectable()
export class ApiCron {
  constructor(
    private readonly apiService: ApiService,
    private readonly propriedadeService: PropriedadeService,
  ) {}

  @Cron('30 0 * * *')
  async handleCron() {
    const result = await this.propriedadeService.findCoordinatesProperty();
    await this.apiService.setETO(result);
  }
}
