import { Test, TestingModule } from '@nestjs/testing';
import { BeersService } from './beers.service';

describe('BeersService', () => {
  let service: BeersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeersService],
    }).compile();

    service = module.get<BeersService>(BeersService);
  });

  beforeEach(() => {
    service.beers = [{ id: 1, stock: 2 }, { id: 2, stock: 0 }];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return undefined if the beer does not exist', () => {
      expect(service.findOneById(3)).toBeUndefined();
    });
    it('should return the beer', () => {
      expect(service.findOneById(1)).toEqual(service.beers[0]);
    });
  });
  describe('findAll', () => {
    it('should return all beers', () => {
      expect(service.findAll().length).toBe(service.beers.length);
    });
  });
  describe('isStockAvailable', () => {
    it('should false if the beer does not exist', () => {
      expect(service.isStockAvailable(3)).toBeFalsy();
    });
    it('should false if the beer has a stock === 0', () => {
      expect(service.isStockAvailable(2)).toBeFalsy();
    });
    it('should false if the beer has a stock > 0', () => {
      expect(service.isStockAvailable(3)).toBeFalsy();
    });
  });

  describe('decreaseStock', () => {
    it('should descrease the stock of the selected beer', () => {
      service.decreaseStock(1);
      expect(service.findOneById(1).stock).toBe(1);
    });
  });
});
