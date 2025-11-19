import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SubCategoriesModule } from './modules/subcategories/subcategories.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

      // ✅ Enable Playground and schema visibility in production
      playground: true,
      introspection: true,

      // optional but good practice
      path: '/graphql',
      context: ({ req, res }) => ({ req, res }),
    }),

    PrismaModule,
    ProductsModule,
    CategoriesModule,
    SubCategoriesModule,
  ],
})
export class AppModule {}
