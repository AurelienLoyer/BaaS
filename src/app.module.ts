import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BeersModule } from './beers/beers.module';
import { CartsModule } from './carts/carts.module';
import { UsersModule } from './users/users.module';
import { UuidValidator } from './beers/validators/id.validator';

@Module({
  imports: [BeersModule, CartsModule, UsersModule],
  controllers: [AppController],
  providers: [UuidValidator],
})
export class AppModule {}
