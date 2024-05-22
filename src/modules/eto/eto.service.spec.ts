import { Test, TestingModule } from '@nestjs/testing';
import { EtoService } from './eto.service';

describe('EtoService', () => {
  let service: EtoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EtoService],
    }).compile();

    service = module.get<EtoService>(EtoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
