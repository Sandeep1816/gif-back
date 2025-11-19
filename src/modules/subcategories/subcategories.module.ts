import { Module } from '@nestjs/common';
import { SubCategoriesResolver } from './subcategories.resolver';
import { SubCategoriesService } from './subcategories.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [SubCategoriesResolver, SubCategoriesService, PrismaService],
})
export class SubCategoriesModule {}
