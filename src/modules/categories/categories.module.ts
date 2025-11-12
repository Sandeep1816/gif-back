import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { PrismaService } from '../../prisma/prisma.service'; // ✅ add this if not globally provided

@Module({
  providers: [CategoriesService, CategoriesResolver, PrismaService],
})
export class CategoriesModule {}
