import { Beer } from './../../beers/entities/beer.entity';

export interface Cart {
  id: number;
  beers: Beer[];
  creationDate?: Date;
}
