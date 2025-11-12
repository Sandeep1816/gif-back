import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // 🧩 Helper: automatically generate a slug from the product title
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')   // replace spaces & special chars with '-'
      .replace(/^-+|-+$/g, '');      // trim hyphens
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

  // ✅ Create product (auto-slug + safe category connect)
  async create(data: any) {
    const baseSlug = data.slug || this.generateSlug(data.title);
    let slug = baseSlug;
    let count = 1;

    // Prevent duplicate slugs
    while (await this.prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    // ✅ Remove categoryId (Prisma doesn't accept it directly)
    const { categoryId, ...rest } = data;

    return this.prisma.product.create({
      data: {
        ...rest,
        slug,
        // ✅ Proper relation connect
        ...(categoryId && {
          category: {
            connect: { id: categoryId },
          },
        }),
      },
    });
  }

  update(id: string, data: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
