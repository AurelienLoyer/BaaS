import { Injectable } from '@nestjs/common';
import { Beer } from './entities/beer.entity';

import beersJson from './../../static/data/beers.json';

@Injectable()
export class BeersService {
  beers: Beer[] = beersJson;

  findOneById(id: number): Beer {
    return this.beers.find(beer => beer.id === id);
  }

  findAll(): Beer[] {
    return this.beers;
  }

  isStockAvailable(id: number): Beer {
    return this.beers.find(beer => beer.id === id && beer.stock > 0);
  }

  decreaseStock(id: number): Beer | boolean {
    const beerIndex = this.beers.findIndex((beer: Beer) => beer.id === id);

    if (beerIndex > -1) {
      this.beers[beerIndex].stock = this.beers[beerIndex].stock - 1;
      return this.beers[beerIndex];
    } else {
      return false;
    }
  }
}
