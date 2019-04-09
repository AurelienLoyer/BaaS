import { Module } from '@nestjs/common';
import { BeersController } from './beers.controller';
import { BeersService } from './beers.service';

@Module({
  controllers: [BeersController],
  providers: [BeersService]
})
export class BeersModule {}
