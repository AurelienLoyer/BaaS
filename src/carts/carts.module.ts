import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { BeersService } from 'src/beers/beers.service';

@Module({
  controllers: [CartsController],
  providers: [
    BeersService,
  ],
})
export class CartsModule {}
