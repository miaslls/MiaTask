import styles from '@/styles/home.module.css';

import Head from 'next/head';
import prisma from '@/lib/prisma';
import { Task } from '@prisma/client';
import { ChangeEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';
import { Toaster, DefaultToastOptions } from 'react-hot-toast';

import TaskList from '@/components/task-list';
import TaskForm from '@/components/task-form';
import Footer from '@/components/footer';

export const getServerSideProps: GetServerSideProps = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: [{ starred: 'desc' }, { completed: 'asc' }, { updatedAt: 'desc' }],
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
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [inputText, setInputText] = useState('');

  const toastOptions: DefaultToastOptions = {
    style: {
      background: 'var(--white-transluscent)',
      color: 'var(--black)',
      borderRadius: 0,
    },
    success: {
      iconTheme: {
        primary: 'var(--green)',
        secondary: 'var(--white-transluscent)',
      },
    },
    error: {
      iconTheme: {
        primary: 'var(--red)',
        secondary: 'var(--white-transluscent)',
      },
    },
  };

  function handleCreateForm() {
    if (showCreateForm) {
      setInputText('');
    }
    setShowCreateForm(!showCreateForm);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  return (
    <>
      <Head>
        <title>
          MiaTask - Simple Task Management | Organize, Update, and Complete Tasks Effortlessly
        </title>
      </Head>

      <div className="outer_container">
        <Toaster position="top-center" reverseOrder={false} toastOptions={toastOptions} />

        <header>
          <div className={styles.title}>
            <div className={styles.title_logo}>
              <i className="ri-list-check-3"></i>
            </div>

            <h1>
              Mia<span>Task</span>
            </h1>
          </div>

          <div className={styles.add_icon} onClick={handleCreateForm}>
            <i className={showCreateForm ? 'ri-close-circle-line' : 'ri-add-circle-line'}></i>
          </div>
        </header>

        <main>
          <ul className={styles.tasklist}>
            {showCreateForm && (
              <TaskForm
                inputText={inputText}
                handleChange={handleChange}
                handleCreateForm={handleCreateForm}
              />
            )}

            <SWRConfig value={{ fallback }}>
              <TaskList />
            </SWRConfig>
          </ul>
        </main>

        <Footer />
      </div>
    </>
  );
}
