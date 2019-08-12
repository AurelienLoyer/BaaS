import { Response } from 'express';
import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { BeerUnavailableException } from './beers.exception';

@Catch(BeerUnavailableException)
export class BeerExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).send({
      error: exception.message,
    });
  }
}
