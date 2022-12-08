import { Test, TestingModule } from '@nestjs/testing';
import { VtimgService } from './vtimg.service';

describe('VtimgService', () => {
  let service: VtimgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VtimgService],
    }).compile();

    service = module.get<VtimgService>(VtimgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
