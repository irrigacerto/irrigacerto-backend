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
import { MotobombaService } from './motobomba.service';
import { CreateMotobombaDto } from './dto/create-motobomba.dto';
import { UpdateMotobombaDto } from './dto/update-motobomba.dto';
import { GetUser } from '@/decorators/get-user.decorator';
import { RolesEnum } from '@/decorators/roles.decorator';
import Auth from '@/decorators/auth.decorator';

interface UserPayload {
  sub: string;
  email: string;
  roles: RolesEnum[];
}

@Auth()
@ApiTags('Motobomba')
@ApiBearerAuth()
@Controller('motobomba')
export class MotobombaController {
  constructor(private readonly motobombaService: MotobombaService) {}

  @Post()
  create(@Body() createMotobombaDto: CreateMotobombaDto) {
    return this.motobombaService.create(createMotobombaDto);
  }

  @Get()
  findAll(@GetUser() user: UserPayload) {
    const id_user = parseInt(user.sub);
    return this.motobombaService.findAll(id_user);
  }

  @Get(':id_motobomba')
  findOne(@Param('id_motobomba') id_motobomba: string) {
    return this.motobombaService.findOne(id_motobomba);
  }

  @Patch(':id_motobomba')
  update(
    @Param('id_motobomba') id_motobomba: string,
    @Body() updateMotobombaDto: UpdateMotobombaDto,
  ) {
    return this.motobombaService.update(id_motobomba, updateMotobombaDto);
  }

  @Delete(':id_motobomba')
  remove(@Param('id_motobomba') id_motobomba: string) {
    return this.motobombaService.remove(id_motobomba);
  }
}
