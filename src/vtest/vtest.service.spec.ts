import { Test, TestingModule } from '@nestjs/testing';
import { VtestService } from './vtest.service';

describe('VtestService', () => {
  let service: VtestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VtestService],
    }).compile();

    service = module.get<VtestService>(VtestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
