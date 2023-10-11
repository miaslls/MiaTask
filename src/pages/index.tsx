import styles from '@/styles/home.module.css';

import Head from 'next/head';
import prisma from '@/lib/prisma';
import { Task } from '@prisma/client';
import { ChangeEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';
import { Toaster } from 'react-hot-toast';
import { toastOptions } from '@/lib/toastUtils';

import Header from '@/components/header';
import TaskList from '@/components/task-list';
import TaskForm from '@/components/task-form';
import Footer from '@/components/footer';

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
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [inputText, setInputText] = useState('');

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

        <Header showForm={showCreateForm} handleForm={handleCreateForm} />

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
