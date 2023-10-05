import styles from '@/styles/home.module.css';

import Head from 'next/head';
import prisma from '@/lib/prisma';
import { FormEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';

import { Task } from '@prisma/client';
import TaskList from '@/components/task-list';
import Footer from '@/components/footer';

export default function Home({ fallback }: { fallback: { tasks: Task[] } }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [inputText, setInputText] = useState('');

  //   async function submitCreateData(e: FormEvent<HTMLFormElement>) {
  //     e.preventDefault();
  //     setShowCreateForm(false);
  //
  //     try {
  //       const response = await fetch('/api/create', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ text: inputText }),
  //       });
  //
  //       const data = await response.json();
  //       const indexToInsert = tasklist.findLastIndex((task) => task.starred) + 1;
  //
  //       // FIXME: swr
  //       setTasklist(tasklist.toSpliced(indexToInsert, 0, data.task));
  //       setInputText('');
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }

  return (
    <>
      <Head>
        <title>
          MiaTask - Simple Task Management | Organize, Update, and Complete Tasks Effortlessly
        </title>
      </Head>
      <div className="outer_container">
        <header>
          <div className={styles.title}>
            <div className={styles.title_logo}>
              <i className="ri-list-check-3"></i>
            </div>

            <h1>
              Mia<span>Task</span>
            </h1>
          </div>

          <div className={styles.add_icon} onClick={() => setShowCreateForm(!showCreateForm)}>
            <i className={showCreateForm ? 'ri-close-circle-line' : 'ri-add-circle-line'}></i>
          </div>
        </header>

        <main>
          <ul className={styles.tasklist}>
            {showCreateForm && (
              // <form className={styles.task_input_wrapper} onSubmit={submitCreateData}>
              <form className={styles.task_input_wrapper}>
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

            {/* {tasks.map((task) => (
              <TaskItem task={task} key={`task-item-${task.id}`} />
            ))} */}
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
