import { Test, TestingModule } from '@nestjs/testing';
import { CalcController } from './calc.controller';
import { CalcService } from './calc.service';

describe('CalcController', () => {
  let controller: CalcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalcController],
      providers: [CalcService],
    }).compile();

    controller = module.get<CalcController>(CalcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
