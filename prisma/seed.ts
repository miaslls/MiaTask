// ❗ npx prisma db seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const taskData = [
  {
    text: 'To create a task, click +',
    createdAt: new Date('2000-01-01T00:00:02'),
  },
  {
    text: 'To complete a task, click ◻',
    createdAt: new Date('2000-01-01T00:00:01'),
  },
  {
    text: 'To view more options, click ⫶',
    createdAt: new Date('2000-01-01T00:00:00'),
  },
];

async function main() {
  console.log(`Start seeding ...`);

  await prisma.$transaction(async (tx) => {
    for (const t of taskData) {
      const task = await tx.task.create({ data: t });

      console.log(`Created task with id: ${task.id}`);
    }

    console.log(`Seeding finished.`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
