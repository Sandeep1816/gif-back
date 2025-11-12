import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';
import cors from 'cors';  // ✅ default import

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS
  app.use(cors({ origin: true, credentials: true }));

  // ✅ Parse JSON (fixes Render 400 issue)
  app.use(express.json({ limit: '10mb' }));

  // ✅ File upload support
  app.use(graphqlUploadExpress({ maxFileSize: 10_000_000, maxFiles: 5 }));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Server running on port ${process.env.PORT ?? 3000}`);
}

bootstrap();
