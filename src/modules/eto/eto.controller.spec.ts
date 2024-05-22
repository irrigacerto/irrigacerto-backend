import { Test, TestingModule } from '@nestjs/testing';
import { EtoController } from './eto.controller';
import { EtoService } from './eto.service';

describe('EtoController', () => {
  let controller: EtoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EtoController],
      providers: [EtoService],
    }).compile();

    controller = module.get<EtoController>(EtoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
