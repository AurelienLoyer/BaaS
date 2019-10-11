import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { BeersModule } from './beers/beers.module';
import { CartsModule } from './carts/carts.module';
import { UsersModule } from './users/users.module';
import { ConfigService } from './config.service';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    BeersModule,
    CartsModule,
    UsersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [AppController],
  providers: [
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
