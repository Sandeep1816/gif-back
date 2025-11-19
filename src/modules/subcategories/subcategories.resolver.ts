import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { SubCategoriesService } from './subcategories.service';

@ObjectType()
export class SubCategoryGQL {
  @Field() id: string;
  @Field() name: string;
  @Field() slug: string;
  @Field() categoryId: string;
}

@InputType()
export class CreateSubCategoryInput {
  @Field() name: string;
  @Field({ nullable: true }) slug?: string;
  @Field() categoryId: string;
}

@InputType()
export class UpdateSubCategoryInput {
  @Field({ nullable: true }) name?: string;
  @Field({ nullable: true }) slug?: string;
}

@Resolver(() => SubCategoryGQL)
export class SubCategoriesResolver {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Query(() => [SubCategoryGQL])
  subcategories() {
    return this.subCategoriesService.findAll();
  }

  @Query(() => SubCategoryGQL, { nullable: true })
  subcategory(@Args('id') id: string) {
    return this.subCategoriesService.findOne(id);
  }

  @Mutation(() => SubCategoryGQL)
  createSubCategory(@Args('data') data: CreateSubCategoryInput) {
    return this.subCategoriesService.create(data);
  }

  @Mutation(() => SubCategoryGQL)
  updateSubCategory(@Args('id') id: string, @Args('data') data: UpdateSubCategoryInput) {
    return this.subCategoriesService.update(id, data);
  }

  @Mutation(() => SubCategoryGQL)
  deleteSubCategory(@Args('id') id: string) {
    return this.subCategoriesService.delete(id);
  }
}
