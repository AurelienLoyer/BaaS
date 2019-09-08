import { Beer } from "../../beers/beer.dto";

export interface Cart {
  id: number;
  beers: Beer[];
  creationDate?: Date;
}
