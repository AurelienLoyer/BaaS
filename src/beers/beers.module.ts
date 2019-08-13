import { Module, Logger } from '@nestjs/common';
import { BeersController } from './beers.controller';
import { BeersService } from './beers.service';
import { UuidValidator } from './validators/id.validator';
import { BeersResolver } from './beers.resolver';

@Module({
  controllers: [BeersController],
  providers: [
    BeersResolver,
    UuidValidator,
    BeersService,
    { provide: Logger, useFactory: () => new Logger('BeersModule') },
  ],
  exports: [BeersService],
})
export class BeersModule {}
