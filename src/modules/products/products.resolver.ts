import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { ProductsService } from './products.service';

/* ===============================
        IMAGE TYPES
================================ */

@ObjectType()
export class ProductImageGQL {
  @Field() id: string;
  @Field() url: string;
  @Field() isPrimary: boolean;
  @Field(() => Int) order: number;
}

/* ===============================
        PRODUCT TYPE
================================ */

@ObjectType()
export class ProductGQL {
  @Field() id: string;
  @Field() title: string;
  @Field() slug: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  stock: number;

  @Field()
  isFavourite: boolean;

  @Field({ nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  subCategoryId?: string;

  @Field(() => [ProductImageGQL])
  images: ProductImageGQL[];
}

/* ===============================
        INPUT TYPES
================================ */

@InputType()
export class ProductImageInput {
  @Field() url: string;
  @Field({ nullable: true }) isPrimary?: boolean;
  @Field(() => Int, { nullable: true }) order?: number;
}

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

  @Field(() => [ProductImageInput], { nullable: true })
  images?: ProductImageInput[];

  @Field({ nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  subCategoryId?: string;

  @Field({ nullable: true })
  isFavourite?: boolean;
}

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

  @Field(() => [ProductImageInput], { nullable: true })
  images?: ProductImageInput[];

  @Field({ nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  subCategoryId?: string;

  @Field({ nullable: true })
  isFavourite?: boolean;
}

/* ===============================
        RESOLVER
================================ */

@Resolver(() => ProductGQL)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  /* -------- Queries -------- */

  @Query(() => [ProductGQL])
  products() {
    return this.productsService.findAll();
  }

  @Query(() => ProductGQL, { nullable: true })
  product(@Args('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Query(() => ProductGQL, { nullable: true })
  productBySlug(@Args('slug') slug: string) {
    return this.productsService.findOneBySlug(slug);
  }

  /* -------- Mutations -------- */

  @Mutation(() => ProductGQL)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.create({
      ...data,
      stock: data.stock ?? 0,
      isFavourite: data.isFavourite ?? false,
    });
  }

  @Mutation(() => ProductGQL)
  updateProduct(
    @Args('id') id: string,
    @Args('data') data: UpdateProductInput,
  ) {
    return this.productsService.update(id, data);
  }

  @Mutation(() => ProductGQL)
  deleteProduct(@Args('id') id: string) {
    return this.productsService.delete(id);
  }
}
