import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { BeersModule } from './../beers/beers.module';

@Module({
  controllers: [CartsController],
  imports: [BeersModule],
  providers:[],
})
export class CartsModule {}
