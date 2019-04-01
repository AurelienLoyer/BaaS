import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('🍺 Beer as a Service')
    .setDescription('An API to retrieve beers informations')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);

  console.log(`🍺 - App running on port ${process.env.PORT || 3000}`)
}
bootstrap();
