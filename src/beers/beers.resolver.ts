import { Query, Resolver, Args } from '@nestjs/graphql';
import { BeersService } from './beers.service';
import { BeerDto } from './beer.dto';
import { Int } from 'type-graphql';

@Resolver()
export class BeersResolver {
  constructor(private readonly beerService: BeersService) {}

  @Query(() => [BeerDto])
  beers() {
    return this.beerService.findAll();
  }

  @Query(() => BeerDto)
  beer(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.beerService.findOneById(id);
  }
}
