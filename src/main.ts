import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import { graphqlUploadExpress } from 'graphql-upload-minimal';

// Use require to avoid default-import interop runtime issues
const express = require('express') as typeof import('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Body parser
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // CORS
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://gif-app.vercel.app"
      ],
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    })
  );

  // File upload middleware (Apollo v5 compatible)
  app.use(graphqlUploadExpress({ maxFileSize: 10_000_000, maxFiles: 5 }));

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Server running at http://localhost:${port}`);
}

bootstrap();
