import { Get, Controller } from '@nestjs/common';
import { PowerbiService } from './powerbi.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Power BI')
@Controller('powerbi')
export class PowerbiController {
  constructor(private readonly powerbiService: PowerbiService) {}

  @Get('findAllDataBI')
  findAllDataBI() {
    return this.powerbiService.findAllDataBI();
  }
}
