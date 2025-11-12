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
exports.OrdersResolver = exports.CreateOrderInput = exports.CreateOrderItemInput = exports.OrderGQL = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
let OrderGQL = class OrderGQL {
    id;
    status;
    totalCents;
    createdAt;
};
exports.OrderGQL = OrderGQL;
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], OrderGQL.prototype, "id", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], OrderGQL.prototype, "status", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Int),
    __metadata("design:type", Number)
], OrderGQL.prototype, "totalCents", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", Date)
], OrderGQL.prototype, "createdAt", void 0);
exports.OrderGQL = OrderGQL = __decorate([
    (0, graphql_2.ObjectType)()
], OrderGQL);
let CreateOrderItemInput = class CreateOrderItemInput {
    productId;
    qty;
};
exports.CreateOrderItemInput = CreateOrderItemInput;
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], CreateOrderItemInput.prototype, "productId", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Int),
    __metadata("design:type", Number)
], CreateOrderItemInput.prototype, "qty", void 0);
exports.CreateOrderItemInput = CreateOrderItemInput = __decorate([
    (0, graphql_2.InputType)()
], CreateOrderItemInput);
let CreateOrderInput = class CreateOrderInput {
    totalCents;
    items;
};
exports.CreateOrderInput = CreateOrderInput;
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Int),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "totalCents", void 0);
__decorate([
    (0, graphql_2.Field)(() => [CreateOrderItemInput]),
    __metadata("design:type", Array)
], CreateOrderInput.prototype, "items", void 0);
exports.CreateOrderInput = CreateOrderInput = __decorate([
    (0, graphql_2.InputType)()
], CreateOrderInput);
let OrdersResolver = class OrdersResolver {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    orders() {
        return this.ordersService.findAll();
    }
    async createOrder(data) {
        const items = data.items.map((i) => ({ productId: i.productId, qty: i.qty }));
        return this.ordersService.create({ items, totalCents: data.totalCents });
    }
};
exports.OrdersResolver = OrdersResolver;
__decorate([
    (0, graphql_1.Query)(() => [OrderGQL]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "orders", null);
__decorate([
    (0, graphql_1.Mutation)(() => OrderGQL),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrderInput]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "createOrder", null);
exports.OrdersResolver = OrdersResolver = __decorate([
    (0, graphql_1.Resolver)(() => OrderGQL),
    __metadata("design:paramtypes", [Object])
], OrdersResolver);
//# sourceMappingURL=orders.resolver.js.map