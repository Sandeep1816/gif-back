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
exports.SubCategoriesResolver = exports.UpdateSubCategoryInput = exports.CreateSubCategoryInput = exports.SubCategoryGQL = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
const subcategories_service_1 = require("./subcategories.service");
let SubCategoryGQL = class SubCategoryGQL {
};
exports.SubCategoryGQL = SubCategoryGQL;
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], SubCategoryGQL.prototype, "id", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], SubCategoryGQL.prototype, "name", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], SubCategoryGQL.prototype, "slug", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], SubCategoryGQL.prototype, "categoryId", void 0);
exports.SubCategoryGQL = SubCategoryGQL = __decorate([
    (0, graphql_2.ObjectType)()
], SubCategoryGQL);
let CreateSubCategoryInput = class CreateSubCategoryInput {
};
exports.CreateSubCategoryInput = CreateSubCategoryInput;
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], CreateSubCategoryInput.prototype, "name", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateSubCategoryInput.prototype, "slug", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], CreateSubCategoryInput.prototype, "categoryId", void 0);
exports.CreateSubCategoryInput = CreateSubCategoryInput = __decorate([
    (0, graphql_2.InputType)()
], CreateSubCategoryInput);
let UpdateSubCategoryInput = class UpdateSubCategoryInput {
};
exports.UpdateSubCategoryInput = UpdateSubCategoryInput;
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateSubCategoryInput.prototype, "name", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateSubCategoryInput.prototype, "slug", void 0);
exports.UpdateSubCategoryInput = UpdateSubCategoryInput = __decorate([
    (0, graphql_2.InputType)()
], UpdateSubCategoryInput);
let SubCategoriesResolver = class SubCategoriesResolver {
    constructor(subCategoriesService) {
        this.subCategoriesService = subCategoriesService;
    }
    subcategories() {
        return this.subCategoriesService.findAll();
    }
    subcategory(id) {
        return this.subCategoriesService.findOne(id);
    }
    createSubCategory(data) {
        return this.subCategoriesService.create(data);
    }
    updateSubCategory(id, data) {
        return this.subCategoriesService.update(id, data);
    }
    deleteSubCategory(id) {
        return this.subCategoriesService.delete(id);
    }
};
exports.SubCategoriesResolver = SubCategoriesResolver;
__decorate([
    (0, graphql_1.Query)(() => [SubCategoryGQL]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubCategoriesResolver.prototype, "subcategories", null);
__decorate([
    (0, graphql_1.Query)(() => SubCategoryGQL, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubCategoriesResolver.prototype, "subcategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => SubCategoryGQL),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSubCategoryInput]),
    __metadata("design:returntype", void 0)
], SubCategoriesResolver.prototype, "createSubCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => SubCategoryGQL),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateSubCategoryInput]),
    __metadata("design:returntype", void 0)
], SubCategoriesResolver.prototype, "updateSubCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => SubCategoryGQL),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubCategoriesResolver.prototype, "deleteSubCategory", null);
exports.SubCategoriesResolver = SubCategoriesResolver = __decorate([
    (0, graphql_1.Resolver)(() => SubCategoryGQL),
    __metadata("design:paramtypes", [subcategories_service_1.SubCategoriesService])
], SubCategoriesResolver);
//# sourceMappingURL=subcategories.resolver.js.map