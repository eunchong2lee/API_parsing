import { Test, TestingModule } from '@nestjs/testing';
import { HeatlFoodDataService } from './health-food-data.service';

describe('HeatlFoodDataService', () => {
  let service: HeatlFoodDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeatlFoodDataService],
    }).compile();

    service = module.get<HeatlFoodDataService>(HeatlFoodDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
