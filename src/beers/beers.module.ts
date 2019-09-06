import { Module } from '@nestjs/common';
import { BeersController } from './beers/beers.controller';
import { BeersService } from './beers/beers.service';

@Module({
  controllers: [BeersController],
  providers: [BeersService]
})
export class BeersModule {}
