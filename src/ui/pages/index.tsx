import styles from '../styles/index.module.css';
import taskStyles from '../components/task-list/styles/task-item.module.css';

import { ChangeEvent, useState } from 'react';
import useTranslation from '../stubs/use-translation';
import type { OpenElement, TaskListState, UiTask } from '../types';
import { mockTasks } from '../mocks/tasks';

import TaskList from '../components/task-list/task-list';
import CreateForm from '../components/forms/create-form';

export type HomeViewProps = {
  state?: TaskListState;
  initialTasks?: UiTask[];
};

function buildTimeStrings(date: Date) {
  const dateStringShort = date.toLocaleDateString('en', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  });

  const dateStringLong = date.toLocaleDateString('en', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  const timeString = date
    .toLocaleTimeString('en', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
    })
    .toLowerCase()
    .split(' ')
    .join('');

  return { dateStringShort, dateStringLong, timeString };
}

// UI-only page variant backed by local state/mocks.
export default function HomeView({ state = 'default', initialTasks = mockTasks }: HomeViewProps) {
  const { t } = useTranslation();

  const [openElement, setOpenElement] = useState<OpenElement>(null);
  const [activeTask, setActiveTask] = useState<UiTask | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [tasks, setTasks] = useState<UiTask[]>(initialTasks);

  const visibleTasks = state === 'empty' ? [] : tasks;

  function handleOpenElement(element?: OpenElement, task?: UiTask) {
    if (element) {
      if (task) {
        setActiveTask(task);
      }

      setOpenElement(element);
      return;
    }

    setOpenElement(null);
    setActiveTask(null);
    setInputText('');
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  function handleCreateTask(text: string) {
    if (!text.trim()) return;

    const now = new Date();
    const time = buildTimeStrings(now);

    setTasks((current) => [
      {
        id: `task-${now.getTime()}`,
        text,
        completed: false,
        starred: false,
        ...time,
      },
      ...current,
    ]);
  }

  function handleToggleComplete(taskId: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );

    setActiveTask((current) =>
      current && current.id === taskId ? { ...current, completed: !current.completed } : current,
    );
  }

  function handleToggleStar(taskId: string) {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, starred: !task.starred } : task)),
    );

    setActiveTask((current) =>
      current && current.id === taskId ? { ...current, starred: !current.starred } : current,
    );
  }

  function handleUpdateTaskText(taskId: string, text: string) {
    setTasks((current) => current.map((task) => (task.id === taskId ? { ...task, text } : task)));
    setActiveTask((current) => (current && current.id === taskId ? { ...current, text } : current));
  }

  function handleDeleteTask(taskId: string) {
    setTasks((current) => current.filter((task) => task.id !== taskId));
    handleOpenElement();
  }

  return (
    <>
      {openElement === 'create' ? (
        <CreateForm
          inputText={inputText}
          handleChange={handleInputChange}
          closeForm={handleOpenElement}
          onSubmit={handleCreateTask}
        />
      ) : (
        <button
          type="button"
          className={taskStyles.task + ' ' + styles.add_button}
          onClick={() => handleOpenElement('create')}
          aria-label={t('a11y:aria.label.open-create')}
          title={t('a11y:title.add')}
        >
          <div className={taskStyles.task_icon + ' ' + taskStyles.checkbox_icon}>
            <i className="ri-add-box-line"></i>
          </div>

          <div className={taskStyles.task_text + ' ' + styles.add_text}>{t('add-button')}</div>
        </button>
      )}

      <ul className={styles.tasklist}>
        <TaskList
          tasks={visibleTasks}
          state={state}
          handleOpenElement={handleOpenElement}
          openElement={openElement}
          activeTask={activeTask}
          onToggleComplete={handleToggleComplete}
          onToggleStar={handleToggleStar}
          onUpdateTaskText={handleUpdateTaskText}
          onDeleteTask={handleDeleteTask}
        />
      </ul>
    </>
  );
}
