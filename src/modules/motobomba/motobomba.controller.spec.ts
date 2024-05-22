import { Test, TestingModule } from '@nestjs/testing';
import { MotobombaController } from './motobomba.controller';
import { MotobombaService } from './motobomba.service';

describe('MotobombaController', () => {
  let controller: MotobombaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotobombaController],
      providers: [MotobombaService],
    }).compile();

    controller = module.get<MotobombaController>(MotobombaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
