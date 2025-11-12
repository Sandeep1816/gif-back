import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Parse JSON bodies (fix for Render)
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // ✅ Enable CORS
  app.use(cors({ origin: true, credentials: true }));

  // ✅ Enable file uploads
  app.use(graphqlUploadExpress({ maxFileSize: 10_000_000, maxFiles: 5 }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server running at http://localhost:${port}`);
}

bootstrap();
