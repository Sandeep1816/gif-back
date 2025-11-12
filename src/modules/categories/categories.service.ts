import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  // 🧩 Helper: automatically generate a slug from the category name
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')  // replace spaces and special chars with '-'
      .replace(/^-+|-+$/g, '');     // trim hyphens from start/end
  }

  findAll() {
    return this.prisma.category.findMany({ include: { products: true } });
  }

  findOne(id: string) {
    return this.prisma.category.findUnique({ where: { id }, include: { products: true } });
  }

  // ✅ Auto-generate slug if missing and ensure uniqueness
  async create(data: Prisma.CategoryCreateInput) {
    const baseSlug = data.slug || this.generateSlug(data.name);
    let slug = baseSlug;
    let count = 1;

    // Prevent duplicate slugs (e.g., "birthday-gifts-2", "birthday-gifts-3", etc.)
    while (await this.prisma.category.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    return this.prisma.category.create({
      data: { ...data, slug },
    });
  }

  update(id: string, data: Prisma.CategoryUpdateInput) {
    return this.prisma.category.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
