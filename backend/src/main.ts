import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`api/v${process.env.API_VERSION}`);
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  await app.listen(process.env.APP_PORT);
}
bootstrap();
