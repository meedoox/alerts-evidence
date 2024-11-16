import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`api/v${process.env.API_VERSION}`);
  app.use(cors());
  await app.listen(process.env.APP_PORT);
}
bootstrap();
