import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    private generateSlug;
    findAll(): Prisma.PrismaPromise<({
        category: {
            id: string;
            slug: string;
            name: string;
            createdAt: Date;
        } | null;
    } & {
        id: string;
        slug: string;
        createdAt: Date;
        title: string;
        description: string | null;
        imageUrl: string | null;
        priceCents: number;
        stock: number;
        categoryId: string | null;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Prisma.Prisma__ProductClient<({
        category: {
            id: string;
            slug: string;
            name: string;
            createdAt: Date;
        } | null;
    } & {
        id: string;
        slug: string;
        createdAt: Date;
        title: string;
        description: string | null;
        imageUrl: string | null;
        priceCents: number;
        stock: number;
        categoryId: string | null;
        updatedAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    create(data: any): Promise<{
        id: string;
        slug: string;
        createdAt: Date;
        title: string;
        description: string | null;
        imageUrl: string | null;
        priceCents: number;
        stock: number;
        categoryId: string | null;
        updatedAt: Date;
    }>;
    update(id: string, data: Prisma.ProductUpdateInput): Prisma.Prisma__ProductClient<{
        id: string;
        slug: string;
        createdAt: Date;
        title: string;
        description: string | null;
        imageUrl: string | null;
        priceCents: number;
        stock: number;
        categoryId: string | null;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    delete(id: string): Prisma.Prisma__ProductClient<{
        id: string;
        slug: string;
        createdAt: Date;
        title: string;
        description: string | null;
        imageUrl: string | null;
        priceCents: number;
        stock: number;
        categoryId: string | null;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
