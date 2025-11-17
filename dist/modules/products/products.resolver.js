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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsResolver = exports.UpdateProductInput = exports.CreateProductInput = exports.ProductGQL = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
const products_service_1 = require("./products.service");
let ProductGQL = class ProductGQL {
    id;
    title;
    slug;
    description;
    imageUrl;
    priceInr;
    stock;
    isFavourite;
    categoryId;
};
exports.ProductGQL = ProductGQL;
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], ProductGQL.prototype, "id", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], ProductGQL.prototype, "title", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], ProductGQL.prototype, "slug", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProductGQL.prototype, "description", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProductGQL.prototype, "imageUrl", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Int),
    __metadata("design:type", Number)
], ProductGQL.prototype, "priceInr", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Int),
    __metadata("design:type", Number)
], ProductGQL.prototype, "stock", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", Boolean)
], ProductGQL.prototype, "isFavourite", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProductGQL.prototype, "categoryId", void 0);
exports.ProductGQL = ProductGQL = __decorate([
    (0, graphql_2.ObjectType)()
], ProductGQL);
let CreateProductInput = class CreateProductInput {
    title;
    slug;
    priceInr;
    stock;
    description;
    imageUrl;
    categoryId;
    isFavourite;
};
exports.CreateProductInput = CreateProductInput;
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], CreateProductInput.prototype, "title", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "slug", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Int),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "priceInr", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "stock", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "description", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "imageUrl", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "categoryId", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], CreateProductInput.prototype, "isFavourite", void 0);
exports.CreateProductInput = CreateProductInput = __decorate([
    (0, graphql_2.InputType)()
], CreateProductInput);
let UpdateProductInput = class UpdateProductInput {
    title;
    slug;
    priceInr;
    stock;
    description;
    imageUrl;
    categoryId;
    isFavourite;
};
exports.UpdateProductInput = UpdateProductInput;
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "title", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "slug", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateProductInput.prototype, "priceInr", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateProductInput.prototype, "stock", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "description", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "imageUrl", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "categoryId", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateProductInput.prototype, "isFavourite", void 0);
exports.UpdateProductInput = UpdateProductInput = __decorate([
    (0, graphql_2.InputType)()
], UpdateProductInput);
let ProductsResolver = class ProductsResolver {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    products() {
        return this.productsService.findAll();
    }
    product(id) {
        return this.productsService.findOne(id);
    }
    createProduct(data) {
        const createData = {
            ...data,
            stock: data.stock ?? 0,
            isFavourite: data.isFavourite ?? false,
        };
        if (data.categoryId) {
            createData.category = { connect: { id: data.categoryId } };
        }
        return this.productsService.create(createData);
    }
    updateProduct(id, data) {
        const updateData = { ...data };
        if (data.categoryId) {
            updateData.category = { connect: { id: data.categoryId } };
        }
        return this.productsService.update(id, updateData);
    }
    deleteProduct(id) {
        return this.productsService.delete(id);
    }
};
exports.ProductsResolver = ProductsResolver;
__decorate([
    (0, graphql_1.Query)(() => [ProductGQL]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "products", null);
__decorate([
    (0, graphql_1.Query)(() => ProductGQL, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "product", null);
__decorate([
    (0, graphql_1.Mutation)(() => ProductGQL),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProductInput]),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "createProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => ProductGQL),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateProductInput]),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "updateProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => ProductGQL),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "deleteProduct", null);
exports.ProductsResolver = ProductsResolver = __decorate([
    (0, graphql_1.Resolver)(() => ProductGQL),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsResolver);
//# sourceMappingURL=products.resolver.js.map