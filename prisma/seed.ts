import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../app/generated/prisma/client";
import path from "path";

// Database is in the prisma folder (created by prisma migrate)
const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const adapter = new PrismaBetterSqlite3({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Create categories
  const hotDrinks = await prisma.category.upsert({
    where: { name: "Hot Drinks" },
    update: {},
    create: {
      name: "Hot Drinks",
      description: "Warm beverages to start your day",
    },
  });

  const coldDrinks = await prisma.category.upsert({
    where: { name: "Cold Drinks" },
    update: {},
    create: {
      name: "Cold Drinks",
      description: "Refreshing cold beverages",
    },
  });

  const pastries = await prisma.category.upsert({
    where: { name: "Pastries" },
    update: {},
    create: {
      name: "Pastries",
      description: "Fresh baked goods",
    },
  });

  console.log("Created categories:", { hotDrinks, coldDrinks, pastries });

  // Create products
  const products = await Promise.all([
    // Hot Drinks.
    prisma.product.upsert({
      where: { id: "espresso" },
      update: {},
      create: {
        id: "espresso",
        name: "Espresso",
        description: "Rich and bold single shot",
        price: 2.50,
        categoryId: hotDrinks.id,
      },
    }),
    prisma.product.upsert({
      where: { id: "americano" },
      update: {},
      create: {
        id: "americano",
        name: "Americano",
        description: "Espresso with hot water",
        price: 3.00,
        categoryId: hotDrinks.id,
      },
    }),
    prisma.product.upsert({
      where: { id: "latte" },
      update: {},
      create: {
        id: "latte",
        name: "Latte",
        description: "Espresso with steamed milk",
        price: 4.50,
        categoryId: hotDrinks.id,
      },
    }),
    prisma.product.upsert({
      where: { id: "cappuccino" },
      update: {},
      create: {
        id: "cappuccino",
        name: "Cappuccino",
        description: "Espresso with foamed milk",
        price: 4.50,
        categoryId: hotDrinks.id,
      },
    }),
    prisma.product.upsert({
      where: { id: "mocha" },
      update: {},
      create: {
        id: "mocha",
        name: "Mocha",
        description: "Espresso with chocolate and steamed milk",
        price: 5.00,
        categoryId: hotDrinks.id,
      },
    }),

    // Cold Drinks
    prisma.product.upsert({
      where: { id: "iced-latte" },
      update: {},
      create: {
        id: "iced-latte",
        name: "Iced Latte",
        description: "Chilled espresso with cold milk",
        price: 4.75,
        categoryId: coldDrinks.id,
      },
    }),
    prisma.product.upsert({
      where: { id: "cold-brew" },
      update: {},
      create: {
        id: "cold-brew",
        name: "Cold Brew",
        description: "Slow-steeped for 20 hours",
        price: 4.25,
        categoryId: coldDrinks.id,
      },
    }),
    prisma.product.upsert({
      where: { id: "iced-mocha" },
      update: {},
      create: {
        id: "iced-mocha",
        name: "Iced Mocha",
        description: "Chilled chocolate espresso drink",
        price: 5.25,
        categoryId: coldDrinks.id,
      },
    }),

    // Pastries
    prisma.product.upsert({
      where: { id: "croissant" },
      update: {},
      create: {
        id: "croissant",
        name: "Butter Croissant",
        description: "Flaky, buttery pastry",
        price: 3.50,
        categoryId: pastries.id,
      },
    }),
    prisma.product.upsert({
      where: { id: "muffin" },
      update: {},
      create: {
        id: "muffin",
        name: "Blueberry Muffin",
        description: "Fresh-baked with real blueberries",
        price: 3.25,
        categoryId: pastries.id,
      },
    }),
  ]);

  console.log(`Created ${products.length} products`);


  // Create a demo admin user (password would be hashed in real app)
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@coffeestore.com" },
    update: {},
    create: {
      email: "admin@coffeestore.com",
      name: "Admin User",
      password: "hashed_password_here", // In production, use bcrypt or similar
      role: "admin",
    },
  });

  console.log("Created admin user:", adminUser.email);

  // Create a demo customer
  const customerUser = await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      email: "customer@example.com",
      name: "Demo Customer",
      password: "hashed_password_here",
      role: "customer",
    },
  });

  console.log("Created customer user:", customerUser.email);

  // Create sample orders for testing
  // First, delete existing orders to avoid duplicates on re-seed
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});

  const order1 = await prisma.order.create({
    data: {
      userId: customerUser.id,
      status: "pending",
      total: 8.00,
      items: {
        create: [
          { productId: "latte", quantity: 1, price: 4.50 },
          { productId: "croissant", quantity: 1, price: 3.50 },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: customerUser.id,
      status: "confirmed",
      total: 12.75,
      items: {
        create: [
          { productId: "cappuccino", quantity: 2, price: 4.50 },
          { productId: "muffin", quantity: 1, price: 3.25 },
          { productId: "espresso", quantity: 1, price: 2.50 },
        ],
      },
    },
  });

  const order3 = await prisma.order.create({
    data: {
      userId: customerUser.id,
      status: "preparing",
      total: 9.00,
      items: {
        create: [
          { productId: "iced-latte", quantity: 1, price: 4.75 },
          { productId: "cold-brew", quantity: 1, price: 4.25 },
        ],
      },
    },
  });

  const order4 = await prisma.order.create({
    data: {
      userId: customerUser.id,
      status: "ready",
      total: 5.25,
      items: {
        create: [
          { productId: "iced-mocha", quantity: 1, price: 5.25 },
        ],
      },
    },
  });

  const order5 = await prisma.order.create({
    data: {
      userId: customerUser.id,
      status: "completed",
      total: 15.50,
      items: {
        create: [
          { productId: "mocha", quantity: 2, price: 5.00 },
          { productId: "americano", quantity: 1, price: 3.00 },
          { productId: "croissant", quantity: 1, price: 3.50 },
        ],
      },
    },
  });

  const order6 = await prisma.order.create({
    data: {
      userId: customerUser.id,
      status: "cancelled",
      total: 6.75,
      items: {
        create: [
          { productId: "muffin", quantity: 1, price: 3.25 },
          { productId: "croissant", quantity: 1, price: 3.50 },
        ],
      },
    },
  });

  console.log("Created 6 sample orders:", [order1.id, order2.id, order3.id, order4.id, order5.id, order6.id].map(id => id.substring(0, 8)));

  console.log("Seeding completed!");
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
