import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, Task } from '@prisma/client';
import prisma from '@/lib/prisma';
import getErrorMessage from '@api/lib/getErrorMessage';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const taskId = req.query.id;

    if (!taskId) {
      return res.status(400).send({ message: 'Request badly formatted: no id provided' });
    }

    if (Array.isArray(taskId)) {
      return res.status(400).send({ message: 'Request badly formatted: multiple ids provided' });
    }

    if (taskId) {
      return handlePATCH(taskId, res);
    }
  } else {
    return res
      .status(405)
      .send({ message: `The HTTP ${req.method} method is not supported at this route.` });
  }
}

async function handlePATCH(id: string, res: NextApiResponse<{ task: Task } | { message: string }>) {
  try {
    const taskInDb = await prisma.task.findUniqueOrThrow({ where: { id } });

    const data: Prisma.TaskUpdateInput = taskInDb.starred
      ? { starred: false, starredAt: null }
      : { starred: true, starredAt: new Date() };

    const task = await prisma.task.update({ where: { id }, data });

    res.status(200).send({ task });
  } catch (err) {
    console.error(err);
    const message = getErrorMessage(err);

    res.status(500).send({ message });
  }
}
