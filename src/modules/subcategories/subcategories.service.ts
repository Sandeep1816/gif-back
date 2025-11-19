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
        category: { connect: { id: data.categoryId } },
      },
    });
  }

  update(id: string, data: Prisma.SubCategoryUpdateInput) {
    return this.prisma.subCategory.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.subCategory.delete({ where: { id } });
  }
}
