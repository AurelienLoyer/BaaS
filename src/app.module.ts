import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BeersModule } from './beers/beers.module';

@Module({
  imports: [BeersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
