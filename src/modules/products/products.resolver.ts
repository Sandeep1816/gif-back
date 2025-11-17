import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { ProductsService } from './products.service';

@ObjectType()
export class ProductGQL {
  @Field() id: string;
  @Field() title: string;
  @Field() slug: string;
  @Field({ nullable: true }) description?: string;
  @Field({ nullable: true }) imageUrl?: string;

  @Field(() => Int)
  priceInr: number; // UPDATED

  @Field(() => Int)
  stock: number;

  @Field()
  isFavourite: boolean; // NEW

  @Field({ nullable: true })
  categoryId?: string;
}

@InputType()
export class CreateProductInput {
  @Field() title: string;
  @Field({ nullable: true }) slug?: string;

  @Field(() => Int)
  priceInr: number; // UPDATED

  @Field(() => Int, { nullable: true })
  stock?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  isFavourite?: boolean; // NEW
}

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true }) title?: string;
  @Field({ nullable: true }) slug?: string;

  @Field(() => Int, { nullable: true })
  priceInr?: number; // UPDATED

  @Field(() => Int, { nullable: true })
  stock?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  isFavourite?: boolean; // NEW
}

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
    const createData: any = {
      ...data,
      stock: data.stock ?? 0,
      isFavourite: data.isFavourite ?? false,
    };

    if (data.categoryId) {
      createData.category = { connect: { id: data.categoryId } };
    }

    return this.productsService.create(createData);
  }

  @Mutation(() => ProductGQL)
  updateProduct(@Args('id') id: string, @Args('data') data: UpdateProductInput) {
    const updateData: any = { ...data };

    if (data.categoryId) {
      updateData.category = { connect: { id: data.categoryId } };
    }

    return this.productsService.update(id, updateData);
  }

  @Mutation(() => ProductGQL)
  deleteProduct(@Args('id') id: string) {
    return this.productsService.delete(id);
  }
}
