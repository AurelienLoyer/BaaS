import { Test, TestingModule } from '@nestjs/testing';
import { CartsController } from './carts.controller';
import { BeersModule } from './../beers/beers.module';
import { Beer } from './../beers/entities/beer.entity';
import { BeersService } from './../beers/beers.service';
import { HttpException, Logger } from '@nestjs/common';

class MockBeerService {
  beers: Beer[] = [{ id: 1 }, { id: 2 }];
  findAll() {
    return this.beers;
  }
  findOneById(id: number) {
    return this.beers.find(beer => beer.id === id);
  }
  isStockAvailable(id) {
    return id === 1;
  }

  decreaseStock() {
    return true;
  }
}

describe('Carts Controller', () => {
  let controller: CartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartsController],
      providers: [{ provide: BeersService, useClass: MockBeerService }, Logger],
    }).compile();

    controller = module.get<CartsController>(CartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return the new cart of the user', () => {
      const { creationDate, ...rest } = controller.create({ id: 1 });
      expect(rest).toEqual({ id: 1, beers: [] });
    });
  });

  describe('update', () => {
    it('should throw an error if the user does not a have a cart', () => {
      try {
        controller.update({ cart: {} }, []);
      } catch (e) {
        expect(e.message).toEqual(
          'Cart not found, first create an empty cart 🛒 (PUT)',
        );
      }
    });
    it('should throw an error if the beer does not exist', () => {
      try {
        controller.update({ cart: { beers: [] } }, [2]);
      } catch (e) {
        expect(e.message).toEqual('Beer id 2 not available 😅');
      }
    });

    it('should add beers to the cart', () => {
      expect(controller.update({ cart: { beers: [] } }, [1])).toEqual({
        beers: [1],
      });
    });
  });

  describe('findOne', () => {
    it('should return the cart of the user', () => {
      expect(controller.findOne({ cart: { beers: [{ id: 1 }] } })).toEqual({
        beers: [{ id: 1 }],
      });
    });
  });

  describe('delete', () => {
    it('should return the reseted cart of the user', () => {
      expect(controller.delete({})).toEqual({});
    });
  });
});
