import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BeersService } from '../beers.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ name: 'uuidValidator', async: false })
export class UuidValidator implements ValidatorConstraintInterface {
  constructor(private readonly beersService: BeersService) {}

  validate(id: number): boolean {
    return !this.beersService.beers.some(beer => beer.id === id);
  }

  defaultMessage(): string {
    // here you can provide default error message if validation failed
    return "Erreur: 'id' doit etre unique 😨";
  }
}
