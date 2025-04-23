import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearDatabse() {
  // Delete all data from all tables
  await prisma.$executeRaw`TRUNCATE "role_permissions", "permissions", "user_roles", "roles", "users", "stocks", "products", "invoices", "sales", "orders", "customers", "branches", "companies" CASCADE;`;
}

async function main() {
  await clearDatabse();

  // Write seed code here

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
