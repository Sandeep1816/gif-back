import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';

@ObjectType()
export class CategoryGQL {
  @Field() id: string;
  @Field() name: string;
  @Field() slug: string;
}

@InputType()
export class CreateCategoryInput {
  @Field() name: string;
  @Field({ nullable: true }) slug?: string; // ✅ optional slug
}

@InputType()
export class UpdateCategoryInput {
  @Field({ nullable: true }) name?: string;
  @Field({ nullable: true }) slug?: string;
}

@Resolver(() => CategoryGQL)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  // 🧩 Get all categories
  @Query(() => [CategoryGQL])
  categories() {
    return this.categoriesService.findAll();
  }

  // 🧩 Get single category
  @Query(() => CategoryGQL, { nullable: true })
  category(@Args('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  // 🧩 Create category
  @Mutation(() => CategoryGQL)
  createCategory(@Args('data') data: CreateCategoryInput) {
    // ✅ Only send slug if it exists to avoid type error
    const createData: any = { name: data.name };
    if (data.slug) createData.slug = data.slug;

    return this.categoriesService.create(createData);
  }

  // 🧩 Update category
  @Mutation(() => CategoryGQL)
  updateCategory(@Args('id') id: string, @Args('data') data: UpdateCategoryInput) {
    return this.categoriesService.update(id, data);
  }

  // 🧩 Delete category
  @Mutation(() => CategoryGQL)
  deleteCategory(@Args('id') id: string) {
    return this.categoriesService.delete(id);
  }
}
