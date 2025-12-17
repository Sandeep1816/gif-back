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

  private includeAll: Prisma.ProductInclude = {
    category: true,
    subcategory: true,
    images: {
      orderBy: {
        order: Prisma.SortOrder.asc,
      },
    },
  };

  findAll() {
    return this.prisma.product.findMany({
      include: this.includeAll,
      orderBy: { createdAt: Prisma.SortOrder.desc },
    });
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: this.includeAll,
    });
  }

  findOneBySlug(slug: string) {
    return this.prisma.product.findUnique({
      where: { slug },
      include: this.includeAll,
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

        ...(data.images && {
          images: {
            create: data.images.map((img, index) => ({
              url: img.url,
              isPrimary: img.isPrimary ?? index === 0,
              order: img.order ?? index,
            })),
          },
        }),
      },
      include: this.includeAll,
    });
  }

  async update(id: string, data: any) {
    const { images, ...rest } = data;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...rest,
        ...(images && {
          images: {
            deleteMany: {},
            create: images.map((img, index) => ({
              url: img.url,
              isPrimary: img.isPrimary ?? index === 0,
              order: img.order ?? index,
            })),
          },
        }),
      },
      include: this.includeAll,
    });
  }

  delete(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
