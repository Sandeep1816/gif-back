import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Body Parser
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // ⭐ FIX CORS FOR RENDER + LOCALHOST + VERCEL
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "https://gif-app.vercel.app",
        "https://gif-back.onrender.com",   // 🔥 REQUIRED FOR RENDER
      ],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      allowedHeaders: "Content-Type, Authorization, Accept",
      credentials: true,
    })
  );

  const port = process.env.PORT || 10000; // 🔥 Render uses dynamic port
  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
}

bootstrap();
