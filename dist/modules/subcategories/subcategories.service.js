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
exports.SubCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SubCategoriesService = class SubCategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    findAll() {
        return this.prisma.subCategory.findMany({
            include: { category: true, products: true },
        });
    }
    findOne(id) {
        return this.prisma.subCategory.findUnique({
            where: { id },
            include: { category: true, products: true },
        });
    }
    async create(data) {
        const baseSlug = data.slug || this.generateSlug(data.name);
        let slug = baseSlug;
        let count = 1;
        while (await this.prisma.subCategory.findUnique({ where: { slug } })) {
            slug = `${baseSlug}-${count++}`;
        }
        return this.prisma.subCategory.create({
            data: {
                name: data.name,
                slug,
                category: { connect: { id: data.categoryId } },
            },
            include: { category: true, products: true },
        });
    }
    update(id, data) {
        return this.prisma.subCategory.update({
            where: { id },
            data,
            include: { category: true, products: true },
        });
    }
    delete(id) {
        return this.prisma.subCategory.delete({ where: { id } });
    }
};
exports.SubCategoriesService = SubCategoriesService;
exports.SubCategoriesService = SubCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubCategoriesService);
//# sourceMappingURL=subcategories.service.js.map