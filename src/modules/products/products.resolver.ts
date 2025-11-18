import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { ProductsService } from './products.service';

/* ===============================
        GQL OBJECT TYPE
================================ */

@ObjectType()
export class ProductGQL {
  @Field() id: string;
  @Field() title: string;
  @Field() slug: string;
  @Field({ nullable: true }) description?: string;
  @Field({ nullable: true }) imageUrl?: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  stock: number;

  @Field()
  isFavourite: boolean;

  @Field({ nullable: true })
  categoryId?: string;
}

/* ===============================
        CREATE INPUT
================================ */

@InputType()
export class CreateProductInput {
  @Field() title: string;
  @Field({ nullable: true }) slug?: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int, { nullable: true })
  stock?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  isFavourite?: boolean;
}

/* ===============================
        UPDATE INPUT
================================ */

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true }) title?: string;
  @Field({ nullable: true }) slug?: string;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field(() => Int, { nullable: true })
  stock?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  isFavourite?: boolean;
}

/* ===============================
        RESOLVER
================================ */

@Resolver(() => ProductGQL)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [ProductGQL])
  products() {
    return this.productsService.findAll();
  }

  @Query(() => ProductGQL, { nullable: true })
  product(@Args('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => ProductGQL)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.create({
      ...data,
      stock: data.stock ?? 0,
      isFavourite: data.isFavourite ?? false,
    });
  }

  @Mutation(() => ProductGQL)
  updateProduct(@Args('id') id: string, @Args('data') data: UpdateProductInput) {
    return this.productsService.update(id, data);
  }

  @Mutation(() => ProductGQL)
  deleteProduct(@Args('id') id: string) {
    return this.productsService.delete(id);
  }
}
