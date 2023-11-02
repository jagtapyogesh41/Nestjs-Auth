import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  //define the options or config setting for swagger doc
  const options = new DocumentBuilder()
    .setTitle('GDM-ERP')
    .setDescription(`API's for ERP`)
    .setVersion('0.1')
    .addTag('user')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  // setup the swagger module
  SwaggerModule.setup('api', app, document);
  await app.listen(8888);
}
bootstrap();
