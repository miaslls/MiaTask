import styles from '@/styles/home.module.css';

import Head from 'next/head';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { FormEvent, useState } from 'react';
import { GetServerSideProps } from 'next';

import { Task } from '@prisma/client';
import TaskItem from '@/components/task-item';

export default function Home({ tasks }: { tasks: Task[] }) {
  const [tasklist, setTasklist] = useState(tasks);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [inputText, setInputText] = useState('');

  async function submitCreateData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowCreateForm(false);

    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      const indexToInsert = tasklist.findLastIndex((task) => task.starred) + 1;

      setTasklist(tasklist.toSpliced(indexToInsert, 0, data.task));
      setInputText('');
    } catch (e) {
      console.error(e);
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

            {tasklist.map((task) => (
              <TaskItem task={task} key={`task-item-${task.id}`} />
            ))}
          </ul>
        </main>

        <footer>
          <Link className="text_link" href="https://github.com/miaslls" target="_blank">
            @miaslls
          </Link>
          <span>2023</span>

          <span className={styles.separator_icon}>
            <i className="ri-infinity-line"></i>
          </span>

          <Link
            className="text_link"
            href="https://fonts.google.com/specimen/Roboto+Mono"
            target="_blank"
          >
            font
          </Link>

          <span className={styles.separator_icon}>
            <i className="ri-infinity-line"></i>
          </span>

          <Link className="text_link" href="https://remixicon.com" target="_blank">
            icons
          </Link>
        </footer>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: [{ starred: 'desc' }, { completed: 'asc' }, { updatedAt: 'desc' }],
  });

  return { props: { tasks: JSON.parse(JSON.stringify(tasks)) } };
};
