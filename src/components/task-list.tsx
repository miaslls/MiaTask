import useSWR from 'swr';
import useTranslation from 'next-translate/useTranslation';
import { fetcher } from '@src/lib/fetcher';

import { Task } from '@prisma/client';
import type { OpenElement, ExtendedTask } from '@src/pages/index';

import TaskItem from './task-item';
import TaskModal from './task-modal';

export type TaskListProps = {
  handleOpenElement(element?: OpenElement, task?: ExtendedTask): void;
  openElement: OpenElement;
  activeTask: ExtendedTask | null;
};

export default function TaskList({ handleOpenElement, openElement, activeTask }: TaskListProps) {
  const { t, lang } = useTranslation();

  const url = '/api/task';

  const {
    data: tasklist,
    error,
    isLoading,
  } = useSWR([url, lang], ([url, lang]) => fetcher(url, { headers: { 'Accept-Language': lang } }));

  if (error) {
    return (
      <div className="tasklist_alert">
        <div className="alert_icon">
          <i className="ri-alert-line"></i>
        </div>

        <div>{t('tasklist-fail')}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="tasklist_alert">
        <div className="alert_icon">
          <i className="ri-loop-right-fill"></i>
        </div>

        <div>{t('loading')}</div>
      </div>
    );
  }

  return (
    <>
      {tasklist.tasks.length === 0 ? (
        <div className="tasklist_alert">
          <div className="alert_icon">
            <i className="ri-alert-line"></i>
          </div>

          <div>{t('tasklist-empty')}</div>
        </div>
      ) : (
        tasklist.tasks.map((task: Task) => (
          <TaskItem
            task={task}
            handleOpenElement={handleOpenElement}
            key={`task-item-${task.id}`}
          />
        ))
      )}

      {openElement === 'modal' && (
        <TaskModal handleOpenElement={handleOpenElement} activeTask={activeTask} />
      )}
    </>
  );
}
