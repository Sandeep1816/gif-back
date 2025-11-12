"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const mugs = await prisma.category.upsert({
        where: { slug: 'mugs' },
        update: {},
        create: { name: 'Mugs', slug: 'mugs' },
    });
    const flowers = await prisma.category.upsert({
        where: { slug: 'flowers' },
        update: {},
        create: { name: 'Flowers', slug: 'flowers' },
    });
    await prisma.product.upsert({
        where: { slug: 'love-mug' },
        update: {},
        create: {
            title: 'Love Mug',
            slug: 'love-mug',
            description: 'Personalized mug with love notes',
            priceCents: 29900,
            stock: 100,
            category: { connect: { id: mugs.id } },
        },
    });
    await prisma.product.upsert({
        where: { slug: 'rose-bunch' },
        update: {},
        create: {
            title: 'Rose Bunch',
            slug: 'rose-bunch',
            description: 'Fresh red roses bouquet',
            priceCents: 49900,
            stock: 50,
            category: { connect: { id: flowers.id } },
        },
    });
    console.log('Seed done');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map