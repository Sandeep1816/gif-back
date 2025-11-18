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
exports.CategoriesResolver = exports.UpdateCategoryInput = exports.CreateCategoryInput = exports.CategoryGQL = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
const categories_service_1 = require("./categories.service");
let CategoryGQL = class CategoryGQL {
};
exports.CategoryGQL = CategoryGQL;
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], CategoryGQL.prototype, "id", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], CategoryGQL.prototype, "name", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], CategoryGQL.prototype, "slug", void 0);
exports.CategoryGQL = CategoryGQL = __decorate([
    (0, graphql_2.ObjectType)()
], CategoryGQL);
let CreateCategoryInput = class CreateCategoryInput {
};
exports.CreateCategoryInput = CreateCategoryInput;
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], CreateCategoryInput.prototype, "name", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateCategoryInput.prototype, "slug", void 0);
exports.CreateCategoryInput = CreateCategoryInput = __decorate([
    (0, graphql_2.InputType)()
], CreateCategoryInput);
let UpdateCategoryInput = class UpdateCategoryInput {
};
exports.UpdateCategoryInput = UpdateCategoryInput;
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateCategoryInput.prototype, "name", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateCategoryInput.prototype, "slug", void 0);
exports.UpdateCategoryInput = UpdateCategoryInput = __decorate([
    (0, graphql_2.InputType)()
], UpdateCategoryInput);
let CategoriesResolver = class CategoriesResolver {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    categories() {
        return this.categoriesService.findAll();
    }
    category(id) {
        return this.categoriesService.findOne(id);
    }
    createCategory(data) {
        const createData = { name: data.name };
        if (data.slug)
            createData.slug = data.slug;
        return this.categoriesService.create(createData);
    }
    updateCategory(id, data) {
        return this.categoriesService.update(id, data);
    }
    deleteCategory(id) {
        return this.categoriesService.delete(id);
    }
};
exports.CategoriesResolver = CategoriesResolver;
__decorate([
    (0, graphql_1.Query)(() => [CategoryGQL]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "categories", null);
__decorate([
    (0, graphql_1.Query)(() => CategoryGQL, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "category", null);
__decorate([
    (0, graphql_1.Mutation)(() => CategoryGQL),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCategoryInput]),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "createCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => CategoryGQL),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateCategoryInput]),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "updateCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => CategoryGQL),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "deleteCategory", null);
exports.CategoriesResolver = CategoriesResolver = __decorate([
    (0, graphql_1.Resolver)(() => CategoryGQL),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesResolver);
//# sourceMappingURL=categories.resolver.js.map