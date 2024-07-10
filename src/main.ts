import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configuration = app.get(ConfigService);
  app.enableCors({
    origin: configuration.get("whiteList"),
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('K-Jun API')
    .setDescription('K-Jun API')
    .addTag('K-Jun')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configuration.get("swagger.path"), app, document);
  await app.listen(3000);
}
bootstrap();
