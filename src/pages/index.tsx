import styles from '@src/styles/index.module.css';
import taskStyles from '@components/styles/task-item.module.css';

import Head from 'next/head';
import prisma from '@src/lib/prisma';
import { Task } from '@prisma/client';
import { ChangeEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';
import { Toaster } from 'react-hot-toast';
import { toastOptions } from '@src/lib/toast';
import useTranslation from 'next-translate/useTranslation';

import Header from '@components/header';
import TaskList from '@components/task-list';
import CreateTaskForm from '@components/create-task-form';
import Footer from '@components/footer';

export type ShowModal = {
  type: 'details' | 'delete';
  task: Task;
} | null;

export const getServerSideProps: GetServerSideProps = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: [{ completed: 'asc' }, { starred: 'desc' }, { createdAt: 'desc' }],
  });

  return {
    props: {
      fallback: {
        '/api/task': JSON.parse(JSON.stringify(tasks)),
      },
    },
  };
};

export default function Home({ fallback }: { fallback: { tasks: Task[] } }) {
  const [showModal, setShowModal] = useState<ShowModal>(null);
  const [showTaskOptions, setshowTaskOptions] = useState<Task | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createInputText, setCreateInputText] = useState('');
  const [taskToUpdate, setTaskToUpdate] = useState<string | null>(null);
  const [updateInputText, setUpdateInputText] = useState<string>('');

  const { t } = useTranslation('common');

  const handleShowModal = (showModal: ShowModal) => {
    if (showCreateForm) {
      handleCreateForm();
    }

    if (taskToUpdate) {
      handleUpdateForm();
    }

    handleShowOptions();
    setShowModal(showModal);
  };

  const handleShowOptions = (task?: Task) => {
    if (task && task !== showTaskOptions) {
      setshowTaskOptions(task);

      if (showCreateForm) {
        handleCreateForm();
      }

      if (taskToUpdate) {
        handleUpdateForm();
      }
    } else {
      setshowTaskOptions(null);
    }
  };

  function handleCreateForm() {
    if (showTaskOptions) {
      handleShowOptions();
    }

    if (taskToUpdate) {
      handleUpdateForm();
    }

    if (showCreateForm) {
      setCreateInputText('');
    }

    setShowCreateForm(!showCreateForm);
  }

  function handleCreateChange(e: ChangeEvent<HTMLInputElement>) {
    setCreateInputText(e.target.value);
  }

  function handleUpdateForm(task?: Task) {
    if (showTaskOptions) {
      handleShowOptions();
    }

    if (task) {
      setTaskToUpdate(task.id);
      setUpdateInputText(task.text);
    } else {
      setTaskToUpdate(null);
      setUpdateInputText('');
    }
  }

  function handleUpdateChange(e: ChangeEvent<HTMLInputElement>) {
    setUpdateInputText(e.target.value);
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

      <div className="outer_container">
        <Toaster position="top-center" reverseOrder={false} toastOptions={toastOptions} />

        <Header />

        <main>
          {showCreateForm ? (
            <CreateTaskForm
              inputText={createInputText}
              handleChange={handleCreateChange}
              handleForm={handleCreateForm}
            />
          ) : (
            <button
              type="button"
              className={taskStyles.task + ' ' + styles.add_button}
              onClick={handleCreateForm}
              aria-label={t('a11y:aria.label.open-create')}
              title={t('a11y:title.add')}
            >
              <div className={taskStyles.task_icons}>
                <div className={taskStyles.task_icon}>
                  <i className="ri-add-box-line"></i>
                </div>
              </div>

              <div className={taskStyles.task_text + ' ' + styles.add_text}>{t('add-button')}</div>
            </button>
          )}

          <ul className={styles.tasklist}>
            <SWRConfig value={{ fallback }}>
              <TaskList
                showModal={showModal}
                showTaskOptions={showTaskOptions}
                taskToUpdate={taskToUpdate}
                updateInputText={updateInputText}
                handleShowModal={handleShowModal}
                handleShowOptions={handleShowOptions}
                handleUpdateChange={handleUpdateChange}
                handleUpdateForm={handleUpdateForm}
              />
            </SWRConfig>
          </ul>
        </main>

        <Footer />
      </div>
    </>
  );
}
