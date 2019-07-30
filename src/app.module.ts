import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { BeersModule } from './beers/beers.module';
import { CartsModule } from './carts/carts.module';
import { UsersModule } from './users/users.module';
import { UuidValidator } from './beers/validators/id.validator';
import { ConfigService } from './config.service';

@Module({
  imports: [BeersModule, CartsModule, UsersModule],
  controllers: [AppController],
  providers: [
    UuidValidator,
    { provide: Logger, useFactory: () => new Logger('AppModule') },
    {
      provide: ConfigService,
      useValue: new ConfigService(
        `${process.env.NODE_ENV || 'development'}.env`,
      ),
    },
  ],
})
export class AppModule {}
