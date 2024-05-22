import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { PropriedadeService } from '@/modules/propriedade/propriedade.service';

@Injectable()
export class UserIsPropriedadeOwnerGuard implements CanActivate {
  constructor(private propriedadeService: PropriedadeService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const propriedadeId = context.switchToHttp().getRequest()
      .params.id_propriedade;
    const userPayload = context.switchToHttp().getRequest().user;
    const propriedade = await this.propriedadeService.findOneGuard(
      propriedadeId,
    );

    const id_user = JSON.parse(JSON.stringify(propriedade.id_user)).id;
    if (id_user !== userPayload.sub) {
      throw new UnauthorizedException('A propriedade não pertence ao usuário.');
    }

    return true;
  }
}
