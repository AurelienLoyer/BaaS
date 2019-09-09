import { Test, TestingModule } from '@nestjs/testing';
import { BeersController } from './beers.controller';
import { BeersService } from './beers.service';
import { Logger } from '@nestjs/common';
import { Beer } from './beer.dto';
import { BeerUnavailableException } from './beers.exception';

describe('Beers Controller', () => {
  let controller: BeersController;
  let service: BeersService;
  const logger = {
    log: jest.fn(),
  };
  beforeEach(async () => {
    service = {
      beers: [],
      findAll: jest.fn(),
      findOneById: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      add: jest.fn(),
      decreaseStock: jest.fn(),
      isStockAvailable: jest.fn(),
    };

    controller = new BeersController(service, null);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all beers', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return the beer with the id 2', () => {
    service.findOneById = jest.fn().mockReturnValue({
      id: 2,
    });
    const beer = controller.findOne(2);
    expect(service.findOneById).toHaveBeenCalledWith(2);
    expect(beer.id).toBe(2);
  });

  it('should add a beer', () => {
    controller.create({ id: 2, label: 'beerToUpdate' });
    expect(service.add).toHaveBeenCalledWith({
      id: 2,
      label: 'beerToUpdate',
    });
  });

  it('should update a beer', () => {
    service.findOneById = jest.fn().mockReturnValue({
      id: 2,
    });
    controller.update(2, { id: 2, label: 'beerToUpdate' });
    expect(service.update).toHaveBeenCalledWith({
      id: 2,
      label: 'beerToUpdate',
    });
  });

  it('should delete a beer', () => {
    controller.delete(1);
    expect(service.delete).toHaveBeenCalledWith(1);
  });
});
