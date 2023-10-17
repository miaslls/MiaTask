import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, Task } from '@prisma/client';
import prisma from '@/lib/prisma';
import getErrorMessage from '@api/lib/getErrorMessage';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const taskId = req.query.id;

  if (!taskId || Array.isArray(taskId)) {
    return res.status(400).send({ message: 'Route path badly formatted' });
  }

  switch (req.method) {
    case 'PATCH':
      const data = req.body;
      return handlePATCH(taskId, data, res);

    case 'DELETE':
      return handleDELETE(taskId, res);

    default:
      return res
        .status(405)
        .send({ message: `The HTTP ${req.method} method is not supported at this route.` });
  }
}

async function handlePATCH(
  id: string,
  data: Prisma.TaskUpdateInput,
  res: NextApiResponse<{ task: Task } | { message: string }>,
) {
  try {
    await prisma.task.findUniqueOrThrow({ where: { id } });
    const task = await prisma.task.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });

    res.status(200).send({ task });
  } catch (err) {
    console.error(err);
    const message = getErrorMessage(err);

    res.status(500).send({ message });
  }
}

async function handleDELETE(
  id: string,
  res: NextApiResponse<{ task: Task } | { message: string }>,
) {
  try {
    await prisma.task.findUniqueOrThrow({ where: { id } });
    const task = await prisma.task.delete({ where: { id } });

    res.status(200).send({ task });
  } catch (err) {
    console.error(err);
    const message = getErrorMessage(err);

    res.status(500).send({ message });
  }
}
