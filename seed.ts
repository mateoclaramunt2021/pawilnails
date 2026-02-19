import { PrismaClient } from './src/generated/prisma/client.ts';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'node:path';

const dbPath = path.join(process.cwd(), 'dev.db');
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin
  const hashedPassword = await bcrypt.hash('pawilnails2026', 12);
  await prisma.admin.upsert({
    where: { email: 'admin@pawilnails.com' },
    update: {},
    create: {
      email: 'admin@pawilnails.com',
      password: hashedPassword,
      name: 'Pawil Nails Admin',
    },
  });
  console.log('✅ Admin created');

  // Service categories and services
  const categoriesData = [
    {
      name: 'Manicura Semipermanente',
      slug: 'manicura-semipermanente',
      image: '/images/manicura-permanente.jpg',
      order: 1,
      services: [
        { name: 'Esmaltado semipermanente manos', price: 11, duration: 30, order: 1 },
        { name: 'Esmaltado Semi + Base Niveladora', price: 12.5, duration: 35, order: 2 },
        { name: 'Esmaltado Semi Francesa', price: 14, duration: 40, order: 3 },
        { name: 'Manicura Rusa', price: 17.9, duration: 45, order: 4 },
        { name: 'Manicura Completa Semi', price: 23.9, duration: 50, order: 5 },
        { name: 'Retirar semipermanente', price: 7, duration: 15, order: 6 },
      ],
    },
    {
      name: 'Manicura Tradicional',
      slug: 'manicura-tradicional',
      image: '/images/manicura-tradicional.jpg',
      order: 2,
      services: [
        { name: 'Esmaltado tradicional', price: 10, duration: 25, order: 1 },
        { name: 'Manicura completa tradicional', price: 18, duration: 40, order: 2 },
        { name: 'Manicura completa sin esmaltar', price: 15, duration: 35, order: 3 },
      ],
    },
    {
      name: 'Pedicura Semipermanente',
      slug: 'pedicura-semipermanente',
      image: '/images/pedicurasemipermanente.jpg',
      order: 3,
      services: [
        { name: 'Esmaltado semipermanente pies', price: 16.9, duration: 35, order: 1 },
        { name: 'Esmaltado Semipermanente + Base Protectora', price: 18, duration: 40, order: 2 },
        { name: 'Pedicura completa semipermanente', price: 32, duration: 60, order: 3 },
      ],
    },
    {
      name: 'Pedicura Tradicional',
      slug: 'pedicura-tradicional',
      image: '/images/pedicura,tradicional.jpg',
      order: 4,
      services: [
        { name: 'Esmaltado tradicional pies', price: 15.9, duration: 30, order: 1 },
        { name: 'Pedicura completa tradicional', price: 25.9, duration: 50, order: 2 },
        { name: 'Pedicura completa sin esmaltado', price: 22.9, duration: 45, order: 3 },
        { name: 'Cortar, Limar y Masaje', price: 10.9, duration: 25, order: 4 },
      ],
    },
    {
      name: 'Acrílico y Gel',
      slug: 'acrilico-gel',
      image: '/images/acrilicosde-gel.jpg',
      order: 5,
      services: [
        { name: 'Extensión de uñas en acrílico o gel con esmaltado semipermanente', price: 35.9, duration: 75, order: 1 },
        { name: 'Relleno de acrílico o gel', price: 29.9, duration: 60, order: 2 },
        { name: 'Baño de acrílico o gel sobre uña natural', price: 25, duration: 50, order: 3 },
        { name: 'Reconstrucción uñas mordidas', price: 39.9, duration: 80, order: 4 },
        { name: 'Reparación 1 uña con extensión', price: 3.5, duration: 15, order: 5 },
        { name: 'Uñas Acrílicas nuevas Pies', price: 32.9, duration: 70, order: 6 },
        { name: 'Extensión de Uñas + Encapsuladas', price: 49.9, duration: 90, order: 7 },
        { name: 'Uñas Acrílicas Babybommer', price: 39.9, duration: 80, order: 8 },
        { name: 'Retirar Acrílico o Gel', price: 15, duration: 30, order: 9 },
        { name: 'Retirar Acrílico o Gel + Esmaltado', price: 20, duration: 40, order: 10 },
        { name: 'Reparación 1 uña sin extensión', price: 2, duration: 10, order: 11 },
      ],
    },
    {
      name: 'Efectos Semipermanentes',
      slug: 'efectos-semipermanentes',
      image: '/images/efectosemipermanentes.jpg',
      order: 6,
      services: [
        { name: 'Babybommer', price: 19, duration: 45, order: 1 },
        { name: 'Efecto Espejo, Aurora, Glazed', price: 15.9, duration: 40, order: 2 },
        { name: 'Efecto ojo de gato', price: 17.9, duration: 40, order: 3 },
        { name: 'Diseño multidot', price: 18.9, duration: 45, order: 4 },
      ],
    },
    {
      name: 'Nail Art',
      slug: 'nail-art',
      image: '/images/nail,art.jpg',
      order: 7,
      services: [
        { name: 'Decoración básica 1 uña (piedras, stickers, stamping)', price: 1.5, duration: 10, order: 1 },
        { name: 'Decoración plus 1 uña (dibujos mano alzada)', price: 3, duration: 15, order: 2 },
        { name: 'Decoración básica 10 uñas (piedras, stickers, stamping)', price: 12, duration: 30, order: 3 },
        { name: 'Decoración plus 10 uñas (dibujos mano alzada)', price: 20, duration: 45, order: 4 },
      ],
    },
    {
      name: 'Jelly Spa',
      slug: 'jelly-spa',
      image: '/images/jelly-spa.jpg',
      order: 8,
      services: [
        { name: 'Manicura Completa Semipermanente Jelly Spa', price: 29.9, duration: 60, order: 1 },
        { name: 'Manicura Completa Tradicional Jelly Spa', price: 23.9, duration: 55, order: 2 },
        { name: 'Pedicura Completa Semipermanente Jelly Spa', price: 37.9, duration: 70, order: 3 },
        { name: 'Pedicura Completa Tradicional Jelly Spa', price: 30.9, duration: 65, order: 4 },
      ],
    },
    {
      name: 'Suplementos y Extras',
      slug: 'suplementos-extras',
      image: null,
      order: 9,
      services: [
        { name: 'Suplemento 1 color extra', price: 1, duration: 5, order: 1 },
        { name: 'Suplemento Termoterapia a tu servicio', price: 2.5, duration: 15, order: 2 },
      ],
    },
  ];

  for (const cat of categoriesData) {
    const category = await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, image: cat.image, order: cat.order },
      create: {
        name: cat.name,
        slug: cat.slug,
        image: cat.image,
        order: cat.order,
      },
    });

    for (const svc of cat.services) {
      const existing = await prisma.service.findFirst({
        where: { name: svc.name, categoryId: category.id },
      });

      if (!existing) {
        await prisma.service.create({
          data: {
            name: svc.name,
            price: svc.price,
            duration: svc.duration,
            order: svc.order,
            categoryId: category.id,
          },
        });
      }
    }

    console.log(`✅ ${cat.name}: ${cat.services.length} servicios`);
  }

  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
