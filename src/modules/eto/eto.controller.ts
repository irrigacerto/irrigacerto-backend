import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EtoService } from './eto.service';
import { CreateEtoDto } from './dto/create-eto.dto';

@ApiTags('ETO')
@Controller('eto')
export class EtoController {
  constructor(private readonly etoService: EtoService) {}

  // @Post()
  // create(@Body() CreateEtoDto: CreateEtoDto) {
  //   return this.etoService.create(CreateEtoDto);
  // }

  // @Get()
  // findAll() {
  //   return this.etoService.findAll();
  // }
}
