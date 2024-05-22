import { Test, TestingModule } from '@nestjs/testing';
import { SistemairrigacaoService } from './sistemairrigacao.service';

describe('SistemairrigacaoService', () => {
  let service: SistemairrigacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SistemairrigacaoService],
    }).compile();

    service = module.get<SistemairrigacaoService>(SistemairrigacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
