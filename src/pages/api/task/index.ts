import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import getT from 'next-translate/getT';
import { Prisma, Task } from '@prisma/client';
import { getRequestLanguage } from '@api/lib/language';
import { getErrorMessage } from '@/pages/api/lib/errors';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const lang = getRequestLanguage(req);
  const t = await getT(lang, 'errors');

  switch (req.method) {
    case 'GET':
      return handleGET(res, lang);

    case 'POST':
      const data = req.body;
      return handlePOST(data, res, lang);

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
      orderBy: [{ completed: 'asc' }, { starred: 'desc' }, { createdAt: 'desc' }],
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
