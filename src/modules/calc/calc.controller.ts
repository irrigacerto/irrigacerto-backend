import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CalcService } from './calc.service';
import { CreateCalcDto } from './dto/create-calc.dto';
import { CalcCron } from './calc.cron';

@ApiTags('Cálculo')
@Controller('calc')
export class CalcController {
  constructor(
    private readonly calcService: CalcService,
    private readonly calcCron: CalcCron,
  ) {}

  // @Get('execute')
  // async executeCron() {
  //   await this.calcCron.handleCron();
  //   return { message: 'Cron executado com sucesso.' };
  // }

  // @Post()
  // create(@Body() CreateCalcDto: CreateCalcDto) {
  //   return this.calcService.create(CreateCalcDto);
  // }

  // @Get()
  // findAll() {
  //   return this.calcService.findAll();
  // }
}
