import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, Task } from '@prisma/client';
import prisma from '@/lib/prisma';
import getErrorMessage from '@api/lib/getErrorMessage';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const taskId = req.query.id;

    if (!taskId || Array.isArray(taskId)) {
      return res.status(400).send({ message: 'Route path badly formatted' });
    }

    return handleDELETE(taskId, res);
  } else {
    return res
      .status(405)
      .send({ message: `The HTTP ${req.method} method is not supported at this route.` });
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
