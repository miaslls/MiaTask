import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Prisma, Task } from '@prisma/client';
import getErrorMessage from '@api/lib/getErrorMessage';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGET(res);

    case 'POST':
      const data = req.body;
      return handlePOST(data, res);

    default:
      return res
        .status(405)
        .send({ message: `The HTTP ${req.method} method is not supported at this route.` });
  }
}

async function handleGET(res: NextApiResponse<{ tasks: Task[] } | { message: string }>) {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: [{ starred: 'desc' }, { completed: 'asc' }, { updatedAt: 'desc' }],
    });

    res.status(201).send({ tasks });
  } catch (err) {
    console.error(err);
    const message = getErrorMessage(err);

    res.status(500).send({ message });
  }
}

async function handlePOST(
  data: Prisma.TaskCreateInput,
  res: NextApiResponse<{ task: Task } | { message: string }>,
) {
  try {
    const task = await prisma.task.create({ data });

    res.status(201).send({ task });
  } catch (err) {
    console.error(err);
    const message = getErrorMessage(err);

    res.status(500).send({ message });
  }
}
