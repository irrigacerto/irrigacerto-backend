import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DadosCulturaService } from './dadoscultura.service';
import { CreateDadosCulturaDto } from './dto/create-dadoscultura.dto';
import { UpdateDadosCulturaDto } from './dto/update-dadoscultura.dto';
import Auth from '@/decorators/auth.decorator';

@Auth()
@ApiTags('Dados da Cultura')
@ApiBearerAuth()
@Controller('dadoscultura')
export class DadosculturaController {
  constructor(private readonly dadosculturaService: DadosCulturaService) {}

  // @Post()
  // create(@Body() createDadosculturaDto: CreateDadosCulturaDto) {
  //   return this.dadosculturaService.create(createDadosculturaDto);
  // }

  @Get()
  findAll() {
    return this.dadosculturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id_dados_cultura') id_dados_cultura: string) {
    return this.dadosculturaService.findOne(id_dados_cultura);
  }

  // @Patch(':id_dados_cultura')
  // update(
  //   @Param('id_dados_cultura') id_dados_cultura: string,
  //   @Body() updateDadosculturaDto: UpdateDadosCulturaDto,
  // ) {
  //   return this.dadosculturaService.update(
  //     id_dados_cultura,
  //     updateDadosculturaDto,
  //   );
  // }

  // @Delete(':id_dados_cultura')
  // remove(@Param('id_dados_cultura') id_dados_cultura: string) {
  //   return this.dadosculturaService.remove(id_dados_cultura);
  // }
}
