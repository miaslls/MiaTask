import styles from '@/styles/home.module.css';

import Head from 'next/head';
import prisma from '@/lib/prisma';
import { FormEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import { SWRConfig, mutate } from 'swr';
import { Toaster, toast } from 'react-hot-toast';

import { Task } from '@prisma/client';
import TaskList from '@/components/task-list';
import Footer from '@/components/footer';

export default function Home({ fallback }: { fallback: { tasks: Task[] } }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [inputText, setInputText] = useState('');

  function handleCreateForm() {
    if (showCreateForm) {
      setInputText('');
    }
    setShowCreateForm(!showCreateForm);
  }

  async function submitCreateData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleCreateForm();

    const key = '/api/task';

    const response = await fetch(key, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputText }),
    });

    if (response.ok) {
      toast.success('Task created!');
      mutate(key);
    } else {
      toast.error('Something happened...');
    }
  }

  return (
    <>
      <Head>
        <title>
          MiaTask - Simple Task Management | Organize, Update, and Complete Tasks Effortlessly
        </title>
      </Head>
      <div className="outer_container">
        <Toaster position="top-center" reverseOrder={false} />
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
              <form className={styles.task_input_wrapper} onSubmit={submitCreateData}>
                <input
                  autoFocus
                  required
                  type="text"
                  name="text"
                  value={inputText}
                  className={styles.task_input}
                  placeholder="Type your task here..."
                  onChange={(e) => setInputText(e.target.value)}
                />

                <button className={styles.task_input_icon} type="submit">
                  <i className="ri-arrow-right-s-line"></i>
                </button>
              </form>
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
