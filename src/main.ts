import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  const config = new DocumentBuilder()
    .setTitle('AppAhmadishina API Docs')
    .setDescription(`За основу данных, которые оперируют в БД\nбыл взят метод WB API: <a>https://openapi.wb.ru/marketplace/api/ru/#tag/Sklady/paths/~1api~1v3~1offices/get</a>`)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(parseInt(process.env.APP_PORT));
}
bootstrap();
