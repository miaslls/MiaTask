import useSWR from 'swr';
import TaskItem from './task-item';
import { Task } from '@prisma/client';
import { useState } from 'react';

export default function TaskList() {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const handleActiveTask = (taskId: string | null) => {
    if (activeTaskId === taskId) {
      setActiveTaskId(null);
    } else {
      setActiveTaskId(taskId);
    }
  };

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR('/api/task', fetcher);

  if (error)
    return (
      <div>
        <i className="ri-error-warning-line"></i> Failed to load
      </div>
    );

  if (isLoading)
    return (
      <div>
        <i className="ri-loop-right-fill"></i> Loading...
      </div>
    );

  return (
    <>
      {data.tasks.map((task: Task) => (
        <TaskItem
          task={task}
          activeTaskId={activeTaskId}
          handleActiveTask={handleActiveTask}
          key={`task-item-${task.id}`}
        />
      ))}
    </>
  );
}
