import { HttpException, HttpStatus } from '@nestjs/common';

export class BeerUnavailableException extends HttpException {
  constructor(id: number) {
    super(`Cannot find a beer 🍺 with id ${id}`, HttpStatus.NOT_FOUND);
  }
}
