import { Injectable } from '@nestjs/common';
import { Beer } from './entities/beer.entity';

import beers from './../../static/data/beers.json';

@Injectable()
export class BeersService {

    constructor() {}

    findOneById(id: any): Beer {
        return beers.find(beer => beer.id === id);
    }

    findAll(): Beer[] {
        return beers;
    }
}
