import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, Task } from '@prisma/client';
import prisma from '@/lib/prisma';
import getErrorMessage from '@api/lib/getErrorMessage';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const taskId = req.query.id;
    const action = req.query.action;

    if (!taskId || !action) {
      return res
        .status(400)
        .send({ message: 'Request badly formatted: no id or attribute provided' });
    }

    if (Array.isArray(taskId) || Array.isArray(action)) {
      return res
        .status(400)
        .send({ message: 'Request badly formatted: multiple ids or attributes provided' });
    }

    if (action !== 'complete' && action !== 'star') {
      return res
        .status(400)
        .send({ message: "Request badly formatted: attribute MUST BE 'complete' or 'star' " });
    }
    return handlePATCH(taskId, action, res);
  } else {
    return res
      .status(405)
      .send({ message: `The HTTP ${req.method} method is not supported at this route.` });
  }
}

async function handlePATCH(
  id: string,
  action: 'complete' | 'star',
  res: NextApiResponse<{ task: Task } | { message: string }>,
) {
  try {
    const taskInDb = await prisma.task.findUniqueOrThrow({ where: { id } });
    const key = action === 'complete' ? 'completed' : 'starred';

    const data: Prisma.TaskUpdateInput = taskInDb[key]
      ? { [key]: false, [`${key}At`]: null }
      : { [key]: true, [`${key}At`]: new Date() };

    const task = await prisma.task.update({ where: { id }, data });

    res.status(200).send({ task });
  } catch (err) {
    console.error(err);
    const message = getErrorMessage(err);

    res.status(500).send({ message });
  }
}
