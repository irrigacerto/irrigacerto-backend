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
import { CulturaService } from './cultura.service';
import { CreateCulturaDto } from './dto/create-cultura.dto';
import { UpdateCulturaDto } from './dto/update-cultura.dto';
import { GetUser } from '@/decorators/get-user.decorator';
import { RolesEnum } from '@/decorators/roles.decorator';
import Auth from '@/decorators/auth.decorator';

interface UserPayload {
  sub: string;
  email: string;
  roles: RolesEnum[];
}

@Auth()
@ApiTags('Cultura')
@ApiBearerAuth()
@Controller('cultura')
export class CulturaController {
  constructor(private readonly culturaService: CulturaService) {}

  @Post()
  create(@Body() createCulturaDto: CreateCulturaDto) {
    return this.culturaService.create(createCulturaDto);
  }

  @Get()
  findAll(@GetUser() user: UserPayload) {
    const id_user = parseInt(user.sub);
    return this.culturaService.findAll(id_user);
  }

  @Get(':id_cultura')
  findOne(@Param('id_cultura') id_cultura: string) {
    return this.culturaService.findOne(id_cultura);
  }

  @Patch(':id_cultura')
  update(
    @Param('id_cultura') id_cultura: string,
    @Body() updateCulturaDto: UpdateCulturaDto,
  ) {
    return this.culturaService.update(id_cultura, updateCulturaDto);
  }

  @Delete(':id_cultura')
  remove(@Param('id_cultura') id_cultura: string) {
    return this.culturaService.remove(id_cultura);
  }
}
