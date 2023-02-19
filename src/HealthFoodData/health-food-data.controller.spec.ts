import { Test, TestingModule } from '@nestjs/testing';
import { HealthFoodDataController } from './health-food-data.controller';

describe('HealthFoodDataController', () => {
  let controller: HealthFoodDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthFoodDataController],
    }).compile();

    controller = module.get<HealthFoodDataController>(HealthFoodDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
