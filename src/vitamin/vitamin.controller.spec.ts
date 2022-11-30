import { Test, TestingModule } from '@nestjs/testing';
import { VitaminController } from './vitamin.controller';

describe('VitaminController', () => {
  let controller: VitaminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VitaminController],
    }).compile();

    controller = module.get<VitaminController>(VitaminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
