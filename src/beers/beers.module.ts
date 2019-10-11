import { Module, Logger } from '@nestjs/common';
import { BeersController } from './beers.controller';
import { BeersService } from './beers.service';
import { BeersResolver } from './beers.resolver';

@Module({
  controllers: [BeersController],
  providers: [
    BeersResolver,
    BeersService,
    { provide: Logger, useFactory: () => new Logger('BeersModule') },
  ],
  exports: [BeersService],
})
export class BeersModule {}
