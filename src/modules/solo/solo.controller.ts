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
import { SoloService } from './solo.service';
import { CreateSoloDto } from './dto/create-solo.dto';
import { UpdateSoloDto } from './dto/update-solo.dto';
import { GetUser } from '@/decorators/get-user.decorator';
import { RolesEnum } from '@/decorators/roles.decorator';
import Auth from '@/decorators/auth.decorator';

interface UserPayload {
  sub: string;
  email: string;
  roles: RolesEnum[];
}

@Auth()
@ApiTags('Solo')
@ApiBearerAuth()
@Controller('solo')
export class SoloController {
  constructor(private readonly soloService: SoloService) {}

  @Post()
  create(@Body() createSoloDto: CreateSoloDto) {
    return this.soloService.create(createSoloDto);
  }

  @Get()
  findAll(@GetUser() user: UserPayload) {
    const id_user = parseInt(user.sub);
    return this.soloService.findAll(id_user);
  }

  @Get(':id_solo')
  findOne(@Param('id_solo') id_solo: string) {
    return this.soloService.findOne(id_solo);
  }

  @Patch(':id_solo')
  update(
    @Param('id_solo') id_solo: string,
    @Body() updateSoloDto: UpdateSoloDto,
  ) {
    return this.soloService.update(id_solo, updateSoloDto);
  }

  @Delete(':id_solo')
  remove(@Param('id_solo') id_solo: string) {
    return this.soloService.remove(id_solo);
  }
}
