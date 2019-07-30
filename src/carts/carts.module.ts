import { Module, Logger } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { BeersModule } from './../beers/beers.module';

@Module({
  controllers: [CartsController],
  imports: [BeersModule],
  providers: [{ provide: Logger, useFactory: () => new Logger('CartsModule') }],
})
export class CartsModule {}
