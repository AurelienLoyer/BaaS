import { Module } from '@nestjs/common';
import { BeersModule } from './beers/beers.module';

@Module({
  imports: [BeersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
