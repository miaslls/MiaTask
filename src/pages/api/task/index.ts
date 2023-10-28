import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@src/lib/prisma';
import { Prisma, Task } from '@prisma/client';
import { getRequestLanguage } from '@api/lib/language';
import { getErrorMessage } from '@api/lib/errors';
import { ensureGetTAvailability } from '@api/lib/monkey-patches';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const lang = getRequestLanguage(req);
  const getT = ensureGetTAvailability();
  const t = await getT(lang, 'errors');

  switch (req.method) {
    case 'GET':
      return handleGET(res, lang);

    case 'POST':
      const newTaskData = req.body;
      return handlePOST(newTaskData, res, lang);

    default:
      return res.status(405).send({ message: t('method-not-supported', { method: req.method }) });
  }
}

async function handleGET(
  res: NextApiResponse<{ tasks: Task[] } | { message: string }>,
  lang: string,
) {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: [{ completed: 'asc' }, { starred: 'desc' }, { updatedAt: 'desc' }],
    });

    res.status(201).send({ tasks });
  } catch (err) {
    console.error(err);
    const message = await getErrorMessage(err, lang);

    res.status(500).send({ message });
  }
}

async function handlePOST(
  data: Prisma.TaskCreateInput,
  res: NextApiResponse<{ task: Task } | { message: string }>,
  lang: string,
) {
  try {
    const task = await prisma.task.create({ data });

    res.status(201).send({ task });
  } catch (err) {
    console.error(err);
    const message = await getErrorMessage(err, lang);

    res.status(500).send({ message });
  }
}
