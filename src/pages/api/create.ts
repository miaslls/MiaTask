import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;

  try {
    const task = await prisma.task.create({ data });

    res.status(201).json({ task });
  } catch (e) {
    res.json(e);
  }
}
