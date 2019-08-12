import { Test, TestingModule } from '@nestjs/testing';
import { UuidValidator } from './id.validator';
import { BeersService } from '../beers.service';

describe('IdValidator', () => {
  let validator: UuidValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UuidValidator,
        {
          provide: BeersService,
          useValue: {
            beers: [{ id: 2 }],
          },
        },
      ],
    }).compile();

    validator = module.get<UuidValidator>(UuidValidator);
  });

  it('should be defined', () => {
    expect(validator).toBeDefined();
  });

  it('should return all beers', () => {
    expect(validator.validate(1)).toBeTruthy();
  });

  it('should return the beer with the id 2', () => {
    expect(validator.validate(2)).toBeFalsy();
  });
});
