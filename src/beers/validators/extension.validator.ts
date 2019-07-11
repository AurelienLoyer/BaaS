import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ name: 'extensionValidator', async: false })
export class ExtensionValidator implements ValidatorConstraintInterface {
  validate(filename: string): boolean {
    return /\.(jpe?g|png|gif|bmp)$/i.test(filename) || !filename;
  }

  defaultMessage(): string {
    // here you can provide default error message if validation failed
    return "Erreur: l'image doit avoir une extension correcte 😨 (jpe?g|png|gif|bmp)";
  }
}
