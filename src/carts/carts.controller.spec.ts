import { Test, TestingModule } from '@nestjs/testing';
import { CartsController } from './carts.controller';
import { BeersModule } from './../beers/beers.module';

describe('Carts Controller', () => {
  let controller: CartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartsController],
      imports: [BeersModule],
    }).compile();

    controller = module.get<CartsController>(CartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
