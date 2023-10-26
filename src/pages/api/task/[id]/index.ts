import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, Task } from '@prisma/client';
import prisma from '@/lib/prisma';
import { getRequestLanguage } from '@api/lib/language';
import { getErrorMessage } from '@api/lib/errors';
import { ensureGetTAvailability } from '@api/lib/monkey-patches';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const taskId = req.query.id;

  const lang = getRequestLanguage(req);
  const getT = ensureGetTAvailability();
  const t = await getT(lang, 'errors');

  if (!taskId || Array.isArray(taskId)) {
    return res.status(400).send({ message: t('bad-format') });
  }

  switch (req.method) {
    case 'PATCH':
      const updatedTaskData = req.body;
      return handlePATCH(taskId, updatedTaskData, res, lang);

    case 'DELETE':
      return handleDELETE(taskId, res, lang);

    default:
      return res.status(405).send({ message: t('method-not-supported', { method: req.method }) });
  }
}

async function handlePATCH(
  id: string,
  data: Prisma.TaskUpdateInput,
  res: NextApiResponse<{ task: Task } | { message: string }>,
  lang: string,
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
    const message = await getErrorMessage(err, lang);

    res.status(500).send({ message });
  }
}

async function handleDELETE(
  id: string,
  res: NextApiResponse<{ task: Task } | { message: string }>,
  lang: string,
) {
  try {
    await prisma.task.findUniqueOrThrow({ where: { id } });
    const task = await prisma.task.delete({ where: { id } });

    res.status(200).send({ task });
  } catch (err) {
    console.error(err);
    const message = await getErrorMessage(err, lang);

    res.status(500).send({ message });
  }
}
