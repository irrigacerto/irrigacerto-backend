import { Test, TestingModule } from '@nestjs/testing';
import { DadosculturaService } from './dadoscultura.service';

describe('DadosculturaService', () => {
  let service: DadosculturaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DadosculturaService],
    }).compile();

    service = module.get<DadosculturaService>(DadosculturaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
