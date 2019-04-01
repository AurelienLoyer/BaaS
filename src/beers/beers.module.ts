import { Module } from '@nestjs/common';
import { BeersController } from './beers.controller';

@Module({
  controllers: [BeersController]
})
export class BeersModule {}
