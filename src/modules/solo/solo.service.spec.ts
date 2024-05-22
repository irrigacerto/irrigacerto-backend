import { Test, TestingModule } from '@nestjs/testing';
import { SoloService } from './solo.service';

describe('SoloService', () => {
  let service: SoloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoloService],
    }).compile();

    service = module.get<SoloService>(SoloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
