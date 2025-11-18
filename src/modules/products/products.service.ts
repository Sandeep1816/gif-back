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
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
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
        price: data.price,         // ✔ EXISTS IN SCHEMA NOW
        stock: data.stock ?? 0,
        isFavourite: data.isFavourite ?? false,
        slug,
        ...(data.categoryId && {
          category: { connect: { id: data.categoryId } },
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
