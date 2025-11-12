import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';

@ObjectType()
export class OrderGQL {
  @Field() id: string;
  @Field() status: string;
  @Field(() => Int) totalCents: number;
  @Field() createdAt: Date;
}

@InputType()
export class CreateOrderItemInput {
  @Field() productId: string;
  @Field(() => Int) qty: number;
}

@InputType()
export class CreateOrderInput {
  @Field(() => Int) totalCents: number;
  @Field(() => [CreateOrderItemInput]) items: CreateOrderItemInput[];
}

@Resolver(() => OrderGQL)
export class OrdersResolver {
  constructor(private readonly ordersService: any) {}

  @Query(() => [OrderGQL])
  orders() {
    return this.ordersService.findAll();
  }

  @Mutation(() => OrderGQL)
  async createOrder(@Args('data') data: CreateOrderInput) {
    // GraphQL will already validate types; convert to service shape
    const items = data.items.map((i) => ({ productId: i.productId, qty: i.qty }));
    return this.ordersService.create({ items, totalCents: data.totalCents });
  }
}
