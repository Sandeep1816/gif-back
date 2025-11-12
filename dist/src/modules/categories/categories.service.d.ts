import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    private generateSlug;
    findAll(): Prisma.PrismaPromise<({
        products: {
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
        }[];
    } & {
        id: string;
        slug: string;
        name: string;
        createdAt: Date;
    })[]>;
    findOne(id: string): Prisma.Prisma__CategoryClient<({
        products: {
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
        }[];
    } & {
        id: string;
        slug: string;
        name: string;
        createdAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    create(data: Prisma.CategoryCreateInput): Promise<{
        id: string;
        slug: string;
        name: string;
        createdAt: Date;
    }>;
    update(id: string, data: Prisma.CategoryUpdateInput): Prisma.Prisma__CategoryClient<{
        id: string;
        slug: string;
        name: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    delete(id: string): Prisma.Prisma__CategoryClient<{
        id: string;
        slug: string;
        name: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
