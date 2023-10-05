import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Prisma, Task } from '@prisma/client';

type GetResponseData = {
  tasks: Task[];
};

type PostResponseData = {
  task: Task;
};

type CustomError = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

async function handleGET(res: NextApiResponse<GetResponseData | CustomError>) {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: [{ starred: 'desc' }, { completed: 'asc' }, { updatedAt: 'desc' }],
    });

    res.status(201).send({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}

async function handlePOST(
  data: Prisma.TaskCreateInput,
  res: NextApiResponse<PostResponseData | CustomError>,
) {
  try {
    const task = await prisma.task.create({ data });

    res.status(201).send({ task });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}
