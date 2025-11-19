import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  findAll() {
    return this.prisma.product.findMany({
      include: { category: true, subcategory: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { category: true, subcategory: true },
    });
  }

  findOneBySlug(slug: string) {
    return this.prisma.product.findUnique({
      where: { slug },
      include: { category: true, subcategory: true },
    });
  }

  async create(data: any) {
    const baseSlug = data.slug || this.generateSlug(data.title);
    let slug = baseSlug;
    let count = 1;

    while (await this.prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    return this.prisma.product.create({
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        price: data.price,
        stock: data.stock ?? 0,
        isFavourite: data.isFavourite ?? false,
        slug,

        ...(data.categoryId && {
          category: { connect: { id: data.categoryId } },
        }),

        ...(data.subCategoryId && {
          subcategory: { connect: { id: data.subCategoryId } },
        }),
      },
      include: { category: true, subcategory: true },
    });
  }

  update(id: string, data: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({
      where: { id },
      data,
      include: { category: true, subcategory: true },
    });
  }

  delete(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
