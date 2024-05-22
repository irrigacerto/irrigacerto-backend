import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PropriedadeService } from './propriedade.service';
import { CreatePropriedadeDto } from './dto/create-propriedade.dto';
import { UpdatePropriedadeDto } from './dto/update-propriedade.dto';
import { GetUser } from '@/decorators/get-user.decorator';
import { RolesEnum } from '@/decorators/roles.decorator';
import { UserIsPropriedadeOwnerGuard } from '@/guards/user-is-propriedade-owner.guard';
import Auth from '@/decorators/auth.decorator';

interface UserPayload {
  sub: string;
  email: string;
  roles: RolesEnum[];
}

@Auth()
@ApiTags('Propriedade')
@ApiBearerAuth()
@Controller('propriedade')
export class PropriedadeController {
  constructor(private readonly propriedadeService: PropriedadeService) {}

  @Post()
  create(
    @Body() createPropriedadeDto: CreatePropriedadeDto,
    @GetUser() user: UserPayload,
  ) {
    createPropriedadeDto.id_user = parseInt(user.sub);
    return this.propriedadeService.create(createPropriedadeDto);
  }

  // @Get('findAllCalcProperty')
  // findAllCalcProperty() {
  //   return this.propriedadeService.findAllCalcProperty();
  // }

  // @Get('findCoordinatesProperty')
  // findCoordinatesProperty() {
  //   return this.propriedadeService.findCoordinatesProperty();
  // }

  @Get('findAllDataCalc')
  findAllDataCalc() {
    return this.propriedadeService.findAllDataCalc();
  }

  @Get()
  findAll(@GetUser() user: UserPayload) {
    const id_user = parseInt(user.sub);
    return this.propriedadeService.findAll(id_user);
  }

  @Get('findAllCalcCulture')
  findAllCalcCulture(@GetUser() user: UserPayload) {
    const id_user = parseInt(user.sub);
    return this.propriedadeService.findAllCalcCulture(id_user);
  }

  @Get('findAllPropertyData')
  findAllPropertyData(@GetUser() user: UserPayload) {
    const id_user = parseInt(user.sub);
    return this.propriedadeService.findAllPropertyData(id_user);
  }

  @Get('findAllPropertyItems')
  findAllPropertyItems(@GetUser() user: UserPayload) {
    const id_user = parseInt(user.sub);
    return this.propriedadeService.findAllPropertyItems(id_user);
  }

  @Get(':id_propriedade')
  @UseGuards(UserIsPropriedadeOwnerGuard)
  findOne(@Param('id_propriedade') id_propriedade: string) {
    return this.propriedadeService.findOne(id_propriedade);
  }

  @Patch(':id_propriedade')
  @UseGuards(UserIsPropriedadeOwnerGuard)
  update(
    @GetUser() user: UserPayload,
    @Param('id_propriedade') id_propriedade: string,
    @Body() updatePropriedadeDto: UpdatePropriedadeDto,
  ) {
    updatePropriedadeDto.id_user = parseInt(user.sub);
    return this.propriedadeService.update(id_propriedade, updatePropriedadeDto);
  }

  @Delete(':id_propriedade')
  @UseGuards(UserIsPropriedadeOwnerGuard)
  remove(@Param('id_propriedade') id_propriedade: string) {
    return this.propriedadeService.remove(id_propriedade);
  }
}
