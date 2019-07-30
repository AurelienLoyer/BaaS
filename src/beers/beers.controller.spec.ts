import { Test, TestingModule } from '@nestjs/testing';
import { BeersController } from './beers.controller';
import { BeersService } from './beers.service';
import { Beer } from './entities/beer.entity';
import { Logger } from '@nestjs/common';

class MockBeerService {
  beers: Beer[] = [{ id: 1 }, { id: 2 }];
  findAll() {
    return this.beers;
  }
  findOneById(id: number) {
    return this.beers.find(beer => beer.id === id);
  }
}
describe('Beers Controller', () => {
  let controller: BeersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeersController],
      providers: [{ provide: BeersService, useClass: MockBeerService }, Logger],
    }).compile();

    controller = module.get<BeersController>(BeersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all beers', () => {
    expect(controller.findAll()).toHaveLength(2);
  });

  it('should return the beer with the id 2', () => {
    expect(controller.findOne(2).id).toBe(2);
  });
});
