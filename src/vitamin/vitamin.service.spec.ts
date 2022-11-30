import { Test, TestingModule } from '@nestjs/testing';
import { VitaminService } from './vitamin.service';

describe('VitaminService', () => {
  let service: VitaminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VitaminService],
    }).compile();

    service = module.get<VitaminService>(VitaminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
