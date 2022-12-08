import { Test, TestingModule } from '@nestjs/testing';
import { VtimgController } from './vtimg.controller';

describe('VtimgController', () => {
  let controller: VtimgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VtimgController],
    }).compile();

    controller = module.get<VtimgController>(VtimgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
