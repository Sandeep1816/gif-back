import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Parse JSON
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // ✅ FIX: Explicit CORS configuration
  app.use(cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://gif-app.vercel.app" // Add your deployed frontend URL here
    ],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  }));

  // File uploads
  app.use(graphqlUploadExpress({ maxFileSize: 10_000_000, maxFiles: 5 }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server running at http://localhost:${port}`);
}

bootstrap();
