import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SubCategoriesService {
  constructor(private prisma: PrismaService) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  findAll() {
    // Use prisma.subCategory (camelCase) and include category & products
    return this.prisma.subCategory.findMany({
      include: { category: true, products: true },
    });
  }

  findOne(id: string) {
    return this.prisma.subCategory.findUnique({
      where: { id },
      include: { category: true, products: true },
    });
  }

  // Accept simple input and map to Prisma create shape
  async create(data: { name: string; slug?: string; categoryId: string }) {
    const baseSlug = data.slug || this.generateSlug(data.name);
    let slug = baseSlug;
    let count = 1;

    while (await this.prisma.subCategory.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    return this.prisma.subCategory.create({
      data: {
        name: data.name,
        slug,
        // connect category by id
        category: { connect: { id: data.categoryId } },
      },
      include: { category: true, products: true },
    });
  }

  update(id: string, data: Prisma.SubCategoryUpdateInput) {
    return this.prisma.subCategory.update({
      where: { id },
      data,
      include: { category: true, products: true },
    });
  }

  delete(id: string) {
    return this.prisma.subCategory.delete({ where: { id } });
  }
}
