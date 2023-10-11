import useSWR from 'swr';
import TaskItem from './task-item';
import { Task } from '@prisma/client';
import { useState } from 'react';
import Modal from './modal';

export type ShowModal = {
  type: 'detail' | 'edit' | 'delete';
  task: Task;
} | null;

export default function TaskList() {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<ShowModal>(null);

  const handleShowModal = (showModal: ShowModal) => {
    setShowModal(showModal);
  };

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
          handleShowModal={handleShowModal}
          key={`task-item-${task.id}`}
        />
      ))}

      {showModal && (
        <Modal closeModal={() => handleShowModal(null)}>
          <>{showModal.type === 'detail' && <div>{showModal.task.text}</div>}</>
        </Modal>
      )}
    </>
  );
}
