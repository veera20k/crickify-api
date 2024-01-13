import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { config } from 'dotenv';

async function bootstrap() {
  config(); // Load environment variables from .env file
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
