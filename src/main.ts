import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Use require() for CJS modules (Express, CORS)
const express = require('express');
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // JSON parser
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // FIX: CORS works in Render now
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://gif-app.vercel.app"
      ],
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
}

bootstrap();
