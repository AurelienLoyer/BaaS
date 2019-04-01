import { Test, TestingModule } from '@nestjs/testing';
import { BeersController } from './beers.controller';

describe('Beers Controller', () => {
  let controller: BeersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeersController],
    }).compile();

    controller = module.get<BeersController>(BeersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
