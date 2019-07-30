import { Module } from '@nestjs/common';
import { BeersController } from './beers.controller';
import { BeersService } from './beers.service';
import { UuidValidator } from './validators/id.validator';

@Module({
  controllers: [BeersController],
  providers: [UuidValidator, BeersService],
  exports: [BeersService],
})
export class BeersModule {}
