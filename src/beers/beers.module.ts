import { Module } from '@nestjs/common';
import { BeersController } from './beers/beers.controller';

@Module({
  controllers: [BeersController]
})
export class BeersModule {}
