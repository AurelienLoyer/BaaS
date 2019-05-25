import { Beer } from "src/beers/entities/beer.entity";

export interface Cart {
    id: number;
    beers: Beer[];
}