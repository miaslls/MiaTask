import type { Task } from '@prisma/client';
import type { ExtendedTask } from '@src/pages/index';

export function extendTask(task: Task, lang: string): ExtendedTask {
  const taskDate = new Date(task.updatedAt);
  const dateStringShort = taskDate.toLocaleDateString(lang, {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  });

  const dateStringLong = taskDate.toLocaleDateString(lang, {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  const timeString = taskDate
    .toLocaleTimeString(lang, {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
    })
    .toLowerCase()
    .split(' ')
    .join('');

  return {
    ...task,
    dateStringShort,
    dateStringLong,
    timeString,
  };
}
