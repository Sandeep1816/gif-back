import { ProductsService } from './products.service';
export declare class ProductGQL {
    id: string;
    title: string;
    slug: string;
    description?: string;
    imageUrl?: string;
    priceCents: number;
    stock: number;
    categoryId?: string;
}
export declare class CreateProductInput {
    title: string;
    slug?: string;
    priceCents: number;
    stock?: number;
    description?: string;
    imageUrl?: string;
    categoryId?: string;
}
export declare class UpdateProductInput {
    title?: string;
    slug?: string;
    priceCents?: number;
    stock?: number;
    description?: string;
    imageUrl?: string;
    categoryId?: string;
}
export declare class ProductsResolver {
    private readonly productsService;
    constructor(productsService: ProductsService);
    products(): import("@prisma/client").Prisma.PrismaPromise<({
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
    product(id: string): import("@prisma/client").Prisma.Prisma__ProductClient<({
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
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createProduct(data: CreateProductInput): Promise<{
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
    updateProduct(id: string, data: UpdateProductInput): import("@prisma/client").Prisma.Prisma__ProductClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    deleteProduct(id: string): import("@prisma/client").Prisma.Prisma__ProductClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
