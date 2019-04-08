import { Test, TestingModule } from '@nestjs/testing';
import { BeersController } from './beers.controller';
import { BeersService } from './beers.service';

describe('Beers Controller', () => {
  let controller: BeersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeersController],
      providers: [BeersService],
    }).compile();

    controller = module.get<BeersController>(BeersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
