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
import { SistemaIrrigacaoService } from './sistemairrigacao.service';
import { CreateSistemaIrrigacaoDto } from './dto/create-sistemairrigacao.dto';
import { UpdateSistemaIrrigacaoDto } from './dto/update-sistemairrigacao.dto';
import { GetUser } from '@/decorators/get-user.decorator';
import { RolesEnum } from '@/decorators/roles.decorator';
import Auth from '@/decorators/auth.decorator';

interface UserPayload {
  sub: string;
  email: string;
  roles: RolesEnum[];
}

@Auth()
@ApiTags('Sistema de Irrigação')
@ApiBearerAuth()
@Controller('sistemairrigacao')
export class SistemaIrrigacaoController {
  constructor(
    private readonly sistemaIrrigacaoService: SistemaIrrigacaoService,
  ) {}

  @Post()
  create(@Body() createSistemaIrrigacaoDto: CreateSistemaIrrigacaoDto) {
    return this.sistemaIrrigacaoService.create(createSistemaIrrigacaoDto);
  }

  @Get()
  findAll(@GetUser() user: UserPayload) {
    const id_user = parseInt(user.sub);
    return this.sistemaIrrigacaoService.findAll(id_user);
  }

  @Get(':id_sistema_irrigacao')
  findOne(@Param('id_sistema_irrigacao') id_sistema_irrigacao: string) {
    return this.sistemaIrrigacaoService.findOne(id_sistema_irrigacao);
  }

  @Patch(':id_sistema_irrigacao')
  update(
    @Param('id_sistema_irrigacao') id_sistema_irrigacao: string,
    @Body() updateSistemaIrrigacaoDto: UpdateSistemaIrrigacaoDto,
  ) {
    return this.sistemaIrrigacaoService.update(
      id_sistema_irrigacao,
      updateSistemaIrrigacaoDto,
    );
  }

  @Delete(':id_sistema_irrigacao')
  remove(@Param('id_sistema_irrigacao') id_sistema_irrigacao: string) {
    return this.sistemaIrrigacaoService.remove(id_sistema_irrigacao);
  }
}
