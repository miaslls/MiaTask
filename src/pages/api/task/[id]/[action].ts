import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, Task } from '@prisma/client';
import prisma from '@/lib/prisma';
import { getRequestLanguage } from '@api/lib/language';
import { getErrorMessage } from '@api/lib/errors';
import { ensureGetTAvailability } from '@api/lib/monkey-patches';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const lang = getRequestLanguage(req);
  const getT = ensureGetTAvailability();
  const t = await getT(lang, 'errors');

  if (req.method === 'PATCH') {
    const taskId = req.query.id;
    const action = req.query.action;

    const badFormat =
      !taskId ||
      !action ||
      Array.isArray(taskId) ||
      Array.isArray(action) ||
      (action !== 'complete' && action !== 'star');

    if (badFormat) {
      return res.status(400).send({ message: t('bad-format') });
    }

    return handlePATCH(taskId, action, res, lang);
  } else {
    return res.status(405).send({ message: t('method-not-supported', { method: req.method }) });
  }
}

async function handlePATCH(
  id: string,
  action: 'complete' | 'star',
  res: NextApiResponse<{ task: Task } | { message: string }>,
  lang: string,
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
    const message = await getErrorMessage(err, lang);

    res.status(500).send({ message });
  }
}
