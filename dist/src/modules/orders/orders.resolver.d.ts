export declare class OrderGQL {
    id: string;
    status: string;
    totalCents: number;
    createdAt: Date;
}
export declare class CreateOrderItemInput {
    productId: string;
    qty: number;
}
export declare class CreateOrderInput {
    totalCents: number;
    items: CreateOrderItemInput[];
}
export declare class OrdersResolver {
    private readonly ordersService;
    constructor(ordersService: any);
    orders(): any;
    createOrder(data: CreateOrderInput): Promise<any>;
}
