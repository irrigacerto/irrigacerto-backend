import { Test, TestingModule } from '@nestjs/testing';
import { MotobombaService } from './motobomba.service';

describe('MotobombaService', () => {
  let service: MotobombaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotobombaService],
    }).compile();

    service = module.get<MotobombaService>(MotobombaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
