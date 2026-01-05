"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cors = require("cors");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    app.use(cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://127.0.0.1:3000",
            "https://gif-front-eight.vercel.app",
            "https://gif-app.vercel.app",
            "https://gif-back.onrender.com"
        ],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        allowedHeaders: "Content-Type, Authorization, Accept",
        credentials: true,
    }));
    const port = process.env.PORT || 10000;
    await app.listen(port);
    console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map