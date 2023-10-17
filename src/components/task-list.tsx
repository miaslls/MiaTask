import useSWR from 'swr';
import { ChangeEvent, useState } from 'react';
import { Task } from '@prisma/client';

import Modal from './modal';
import TaskModal from './task-modal';
import TaskItem from './task-item';

export type ShowModal = {
  type: 'details' | 'delete';
  task: Task;
};

export default function TaskList() {
  const [showModal, setShowModal] = useState<ShowModal | null>(null);
  const [showTaskOptions, setshowTaskOptions] = useState<Task | null>(null);

  const [taskToUpdate, setTaskToUpdate] = useState<string | null>(null);
  const [updateInputText, setUpdateInputText] = useState<string>('');

  function handleUpdateForm(task?: Task) {
    if (task) {
      setTaskToUpdate(task.id);
      setUpdateInputText(task.text);
    } else {
      setTaskToUpdate(null);
      setUpdateInputText('');
    }
    setshowTaskOptions(null);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUpdateInputText(e.target.value);
  }

  const handleShowModal = (showModal: ShowModal | null) => {
    setshowTaskOptions(null);
    setShowModal(showModal);
  };

  const handleShowOptions = (task: Task | null) => {
    if (showTaskOptions === task) {
      setshowTaskOptions(null);
    } else {
      setshowTaskOptions(task);
    }
  };

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR('/api/task', fetcher);

  if (error)
    return (
      <div className="tasklist_alert">
        <i className="ri-alert-line"></i> Failed to load
      </div>
    );

  if (isLoading)
    return (
      <div className="tasklist_alert">
        <i className="ri-loop-right-fill"></i> Loading...
      </div>
    );

  return (
    <>
      {data.tasks.length === 0 ? (
        <div className="tasklist_alert">
          <i className="ri-alert-line"></i> Tasklist empty
        </div>
      ) : (
        data.tasks.map((task: Task) => (
          <TaskItem
            task={task}
            showTaskOptions={showTaskOptions}
            handleShowOptions={handleShowOptions}
            handleShowModal={handleShowModal}
            inputText={updateInputText}
            taskToUpdate={taskToUpdate}
            handleChange={handleChange}
            handleForm={handleUpdateForm}
            key={`task-item-${task.id}`}
          />
        ))
      )}

      {showModal && (
        <Modal closeModal={() => handleShowModal(null)} title={showModal.type}>
          <TaskModal showModal={showModal} handleShowModal={handleShowModal} />
        </Modal>
      )}
    </>
  );
}
