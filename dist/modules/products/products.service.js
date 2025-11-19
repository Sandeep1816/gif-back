"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    findAll() {
        return this.prisma.product.findMany({
            include: { category: true, subcategory: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    findOne(id) {
        return this.prisma.product.findUnique({
            where: { id },
            include: { category: true, subcategory: true },
        });
    }
    findOneBySlug(slug) {
        return this.prisma.product.findUnique({
            where: { slug },
            include: { category: true, subcategory: true },
        });
    }
    async create(data) {
        var _a, _b;
        const baseSlug = data.slug || this.generateSlug(data.title);
        let slug = baseSlug;
        let count = 1;
        while (await this.prisma.product.findUnique({ where: { slug } })) {
            slug = `${baseSlug}-${count++}`;
        }
        return this.prisma.product.create({
            data: Object.assign(Object.assign({ title: data.title, description: data.description, imageUrl: data.imageUrl, price: data.price, stock: (_a = data.stock) !== null && _a !== void 0 ? _a : 0, isFavourite: (_b = data.isFavourite) !== null && _b !== void 0 ? _b : false, slug }, (data.categoryId && {
                category: { connect: { id: data.categoryId } },
            })), (data.subCategoryId && {
                subcategory: { connect: { id: data.subCategoryId } },
            })),
            include: { category: true, subcategory: true },
        });
    }
    update(id, data) {
        return this.prisma.product.update({
            where: { id },
            data,
            include: { category: true, subcategory: true },
        });
    }
    delete(id) {
        return this.prisma.product.delete({
            where: { id },
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map