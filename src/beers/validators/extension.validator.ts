import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { BeersService } from "../beers.service";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ name: "extensionValidator", async: false })
export class ExtensionValidator implements ValidatorConstraintInterface {

    constructor(private readonly beersService: BeersService) {}

    validate(filename: string, args: ValidationArguments) {
        if ( /\.(jpe?g|png|gif|bmp)$/i.test(filename) || !filename) {
            return true;
        }
        return false;
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return "Erreur: l'image doit avoir une extension correcte 😨 (jpe?g|png|gif|bmp)";
    }

}