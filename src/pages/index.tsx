import styles from '@src/styles/index.module.css';
import taskStyles from '@components/styles/task-item.module.css';

import Head from 'next/head';
import prisma from '@src/lib/prisma';
import { Task } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';
import { ChangeEvent, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import TaskList from '@components/task-list';
import CreateTaskForm from '@components/create-task-form';

export const getServerSideProps: GetServerSideProps = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: [{ completed: 'asc' }, { starred: 'desc' }, { updatedAt: 'desc' }],
  });

  return {
    props: {
      fallback: {
        '/api/task': JSON.parse(JSON.stringify(tasks)),
      },
    },
  };
};

// export type TaskDateTime = {
//   dateStringShort: string;
//   dateStringLong: string;
//   timeString: string;
// };
//
// export type ExtendedTask = Task & TaskDateTime; // ❓

export type OpenElement = 'create' | 'update' | 'modal' | null;

export type ExtendedTask = Task & {
  dateStringShort: string;
  dateStringLong: string;
  timeString: string;
};

export default function Home({ fallback }: { fallback: { tasks: Task[] } }) {
  const { t } = useTranslation();

  const [openElement, setOpenElement] = useState<OpenElement>(null);
  const [activeTask, setActiveTask] = useState<ExtendedTask | null>(null);
  const [inputText, setInputText] = useState<string>('');

  function handleOpenElement(element?: OpenElement, task?: ExtendedTask) {
    if (element) {
      if (element === 'create') {
        setInputText('');
      }

      if (task) {
        setActiveTask(task);

        if (element === 'update') {
          setInputText(task.text);
        }
      }

      setOpenElement(element);
    } else {
      setOpenElement(null);
      setActiveTask(null);
      setInputText('');
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  return (
    <>
      <Head>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
        <meta name="author" content="miaslls" />

        <link rel="alternate" href="https://miatask.vercel.app/" hrefLang="x-default" />
        <link rel="alternate" href="https://miatask.vercel.app/en/" hrefLang="en" />
        <link rel="alternate" href="https://miatask.vercel.app/pt/" hrefLang="pt" />

        <title>{t('page-title')}</title>
      </Head>

      {openElement === 'create' ? (
        <CreateTaskForm
          inputText={inputText}
          handleChange={handleInputChange}
          closeForm={handleOpenElement}
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
        <SWRConfig value={{ fallback }}>
          <TaskList
            handleOpenElement={handleOpenElement}
            openElement={openElement}
            activeTask={activeTask}
          />
        </SWRConfig>
      </ul>
    </>
  );
}
