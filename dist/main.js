"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const graphql_upload_1 = require("graphql-upload");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
    app.use((0, cors_1.default)({
        origin: [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "https://gif-app.vercel.app"
        ],
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    }));
    app.use((0, graphql_upload_1.graphqlUploadExpress)({ maxFileSize: 10_000_000, maxFiles: 5 }));
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Server running at http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map