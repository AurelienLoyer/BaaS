import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';

import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ConfigService } from './config.service';
import { RequestInterceptor } from './request.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  const configService = app.get(ConfigService);

  const debug = configService.get('DEBUG') || false;
  if (debug) {
    app.useGlobalInterceptors(new RequestInterceptor());
  }
  // app.setGlobalPrefix('api/v1');

  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const options = new DocumentBuilder()
    .setTitle('🍺 Beer as a Service')
    .setDescription('An API to retrieve beers informations')
    .setVersion('1.0')
    .addBearerAuth('Authorization', 'header')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);


  // add auto validation on all application
  // https://docs.nestjs.com/techniques/validation#auto-validation
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get('PORT') || process.env.PORT || 3000;
  await app.listen(port);

  console.log(`App ready to serve fresh beer 🍺  on port ${port}`);
}

bootstrap();
