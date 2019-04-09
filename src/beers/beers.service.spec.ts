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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
