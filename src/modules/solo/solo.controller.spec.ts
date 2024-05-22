import { Test, TestingModule } from '@nestjs/testing';
import { SoloController } from './solo.controller';
import { SoloService } from './solo.service';

describe('SoloController', () => {
  let controller: SoloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoloController],
      providers: [SoloService],
    }).compile();

    controller = module.get<SoloController>(SoloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
