import { Test, TestingModule } from '@nestjs/testing';
import { SistemaIrrigacaoController } from './sistemairrigacao.controller';
import { SistemaIrrigacaoService } from './sistemairrigacao.service';

describe('SistemairrigacaoController', () => {
  let controller: SistemaIrrigacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SistemaIrrigacaoController],
      providers: [SistemaIrrigacaoService],
    }).compile();

    controller = module.get<SistemaIrrigacaoController>(
      SistemaIrrigacaoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
