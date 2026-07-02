import { PrismaClient } from "@prisma/client";
import { DEFAULT_CATEGORY_NAMES } from "@finance-mate/shared";

const prisma = new PrismaClient();

async function main() {
  for (const name of DEFAULT_CATEGORY_NAMES) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name, isSystem: true },
    });
  }
  console.log(`Seeded ${DEFAULT_CATEGORY_NAMES.length} default categories.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
