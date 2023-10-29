import useSWR from 'swr';
import useTranslation from 'next-translate/useTranslation';
import { fetcher } from '@src/lib/fetcher';

import { Task } from '@prisma/client';
import TaskItem from './task-item';

export default function TaskList() {
  const { t, lang } = useTranslation('common');

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
        tasklist.tasks.map((task: Task) => <TaskItem task={task} key={`task-item-${task.id}`} />)
      )}
    </>
  );
}
