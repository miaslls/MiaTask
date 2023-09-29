import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tasks = [
    {
      text: 'To create a task, click +',
      createdAt: new Date('2000-01-01T00:00:02'),
      updatedAt: new Date('2000-01-01T00:00:02'),
    },
    {
      text: 'To edit/remove/star a task, click ⫶',
      createdAt: new Date('2000-01-01T00:00:01'),
      updatedAt: new Date('2000-01-01T00:00:01'),
    },
    {
      text: 'To complete a task, click ◻',
      createdAt: new Date('2000-01-01T00:00:00'),
      updatedAt: new Date('2000-01-01T00:00:00'),
    },
  ];

  const createArr = tasks.map((task) => prisma.task.create({ data: task }));

  await prisma.$transaction(createArr);
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
