import { Query, Resolver, Args } from '@nestjs/graphql';
import { BeersService } from './beers.service';
import { Beer } from './beer.dto';
import { Int } from 'type-graphql';

@Resolver()
export class BeersResolver {
  constructor(private readonly beerService: BeersService) {}

  @Query(() => [Beer])
  beers() {
    return this.beerService.findAll();
  }

  @Query(() => Beer)
  beer(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.beerService.findOneById(id);
  }
}
