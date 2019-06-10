import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { BeersService } from "../beers.service";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ name: "uuidValidator", async: false })
export class UuidValidator implements ValidatorConstraintInterface {

    constructor(private readonly beersService: BeersService) {}

    validate(id: number, args: ValidationArguments) {
        console.log(this);
        const isExistingId = this.beersService.beers.some(beer => beer.id === id);
        return !isExistingId;
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return "Erreur: 'id' doit etre unique 😨";
    }

}