import { Test, TestingModule } from '@nestjs/testing';
import { VtestController } from './vtest.controller';

describe('VtestController', () => {
  let controller: VtestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VtestController],
    }).compile();

    controller = module.get<VtestController>(VtestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
