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
  @Field(() => Int) priceCents: number;
  @Field(() => Int) stock: number;
  @Field({ nullable: true }) categoryId?: string;
}

@InputType()
export class CreateProductInput {
  @Field() title: string;
  @Field({ nullable: true }) slug?: string; // ✅ optional
  @Field(() => Int) priceCents: number;
  @Field(() => Int, { nullable: true }) stock?: number;
  @Field({ nullable: true }) description?: string;
  @Field({ nullable: true }) imageUrl?: string;
  @Field({ nullable: true }) categoryId?: string;
}

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true }) title?: string;
  @Field({ nullable: true }) slug?: string;
  @Field(() => Int, { nullable: true }) priceCents?: number;
  @Field(() => Int, { nullable: true }) stock?: number;
  @Field({ nullable: true }) description?: string;
  @Field({ nullable: true }) imageUrl?: string;
  @Field({ nullable: true }) categoryId?: string;
}

@Resolver(() => ProductGQL)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  // 🧩 Get all products
  @Query(() => [ProductGQL])
  products() {
    return this.productsService.findAll();
  }

  // 🧩 Get single product by ID
  @Query(() => ProductGQL, { nullable: true })
  product(@Args('id') id: string) {
    return this.productsService.findOne(id);
  }

  // 🧩 Create product
  @Mutation(() => ProductGQL)
  createProduct(@Args('data') data: CreateProductInput) {
    const createData: any = {
      ...data,
      stock: data.stock ?? 0,
    };

    if (data.categoryId) {
      createData.category = { connect: { id: data.categoryId } };
    }

    return this.productsService.create(createData);
  }

  // 🧩 Update product
  @Mutation(() => ProductGQL)
  updateProduct(@Args('id') id: string, @Args('data') data: UpdateProductInput) {
    const updateData: any = { ...data };

    if (data.categoryId) {
      updateData.category = { connect: { id: data.categoryId } };
    }

    return this.productsService.update(id, updateData);
  }

  // 🧩 Delete product
  @Mutation(() => ProductGQL)
  deleteProduct(@Args('id') id: string) {
    return this.productsService.delete(id);
  }
}
