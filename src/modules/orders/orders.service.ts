import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({ where: { id } });
  }

  // Create order with transaction: lock product stocks and decrement
  async create(data: { items: { productId: string; qty: number }[]; totalCents: number }) {
    // transactional update - simple example
    return this.prisma.$transaction(async (prisma) => {
      // check stock
      for (const item of data.items) {
        const p = await prisma.product.findUnique({ where: { id: item.productId } });
        if (!p) throw new BadRequestException(`Product not found: ${item.productId}`);
        if (p.stock < item.qty) throw new BadRequestException(`Insufficient stock for ${p.title}`);
      }

      // decrement stock
      for (const item of data.items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.qty } },
        });
      }

      const order = await prisma.order.create({
        data: {
          items: data.items as any,
          totalCents: data.totalCents,
          status: 'PENDING',
        },
      });

      return order;
    });
  }
}
