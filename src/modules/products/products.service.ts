import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Auto-generate slug
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  findAll() {
    return this.prisma.product.findMany({
      include: { category: true },
    });
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  // Create Product
  async create(data: any) {
    const baseSlug = data.slug || this.generateSlug(data.title);
    let slug = baseSlug;
    let count = 1;

    while (await this.prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    const { categoryId, ...rest } = data;

    return this.prisma.product.create({
      data: {
        ...rest,
        slug,
        ...(categoryId && { category: { connect: { id: categoryId } } }),
      },
    });
  }

  // Update Product
  update(id: string, data: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  // Delete Product
  delete(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
