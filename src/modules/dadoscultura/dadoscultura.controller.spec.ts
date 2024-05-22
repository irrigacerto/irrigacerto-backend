import { Test, TestingModule } from '@nestjs/testing';
import { DadosculturaController } from './dadoscultura.controller';
import { DadosculturaService } from './dadoscultura.service';

describe('DadosculturaController', () => {
  let controller: DadosculturaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DadosculturaController],
      providers: [DadosculturaService],
    }).compile();

    controller = module.get<DadosculturaController>(DadosculturaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
