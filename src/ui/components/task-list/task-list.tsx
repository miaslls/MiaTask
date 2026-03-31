import useTranslation from '../../stubs/use-translation';
import type { OpenElement, TaskListState, UiTask, TaskMutationHandlers } from '../../types';
import { noop } from '../../mocks/fallbacks';

import TaskItem from './task-item';
import TaskModal from '../task-modal/task-modal';

export type TaskListProps = TaskMutationHandlers & {
  tasks?: UiTask[];
  state?: TaskListState;
  handleOpenElement?(element?: OpenElement, task?: UiTask): void;
  openElement?: OpenElement;
  activeTask?: UiTask | null;
};

export default function TaskList({
  tasks = [],
  state = 'default',
  handleOpenElement = noop,
  openElement = null,
  activeTask = null,
  onToggleComplete,
  onToggleStar,
  onUpdateTaskText,
  onDeleteTask,
}: TaskListProps) {
  const { t } = useTranslation();

  if (state === 'error') {
    return (
      <div className="tasklist_alert">
        <div className="alert_icon">
          <i className="ri-alert-line"></i>
        </div>

        <div>{t('tasklist-fail')}</div>
      </div>
    );
  }

  if (state === 'loading') {
    return (
      <div className="tasklist_alert">
        <div className="alert_icon">
          <i className="ri-loop-right-fill"></i>
        </div>

        <div>{t('loading')}</div>
      </div>
    );
  }

  if (state === 'empty' || tasks.length === 0) {
    return (
      <div className="tasklist_alert">
        <div className="alert_icon">
          <i className="ri-alert-line"></i>
        </div>

        <div>{t('tasklist-empty')}</div>
      </div>
    );
  }

  return (
    <>
      {tasks.map((task) => (
        <TaskItem
          task={task}
          handleOpenElement={handleOpenElement}
          key={`task-item-${task.id}`}
          onToggleComplete={onToggleComplete}
        />
      ))}

      {openElement === 'modal' && activeTask && (
        <TaskModal
          activeTask={activeTask}
          closeModal={() => handleOpenElement()}
          onToggleComplete={onToggleComplete}
          onToggleStar={onToggleStar}
          onUpdateTaskText={onUpdateTaskText}
          onDeleteTask={onDeleteTask}
        />
      )}
    </>
  );
}
