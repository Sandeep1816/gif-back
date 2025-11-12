import { CategoriesService } from './categories.service';
export declare class CategoryGQL {
    id: string;
    name: string;
    slug: string;
}
export declare class CreateCategoryInput {
    name: string;
    slug?: string;
}
export declare class UpdateCategoryInput {
    name?: string;
    slug?: string;
}
export declare class CategoriesResolver {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    categories(): import("@prisma/client").Prisma.PrismaPromise<({
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
    category(id: string): import("@prisma/client").Prisma.Prisma__CategoryClient<({
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
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createCategory(data: CreateCategoryInput): Promise<{
        id: string;
        slug: string;
        name: string;
        createdAt: Date;
    }>;
    updateCategory(id: string, data: UpdateCategoryInput): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        id: string;
        slug: string;
        name: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    deleteCategory(id: string): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        id: string;
        slug: string;
        name: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
