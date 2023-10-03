import styles from '@/styles/home.module.css';

import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

import prisma from '@/lib/prisma';
import { Task } from '@prisma/client';
import TaskItem from '@/components/task-item';

export const getServerSideProps: GetServerSideProps = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: [{ starred: 'desc' }, { completed: 'asc' }, { updatedAt: 'desc' }],
  });

  return { props: { tasks: JSON.parse(JSON.stringify(tasks)) } };
};

export default function Home({ tasks }: { tasks: Task[] }) {
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

          <div className={styles.add_icon}>
            <i className="ri-add-circle-line"></i>
          </div>
        </header>

        <main>
          <ul className={styles.tasklist}>
            <li className={styles.task_input_wrapper}>
              <input
                type="text"
                name="title"
                className={styles.task_input}
                placeholder="Type your task here..."
              />
              <span className={styles.task_input_icon}>
                <i className="ri-arrow-right-s-line"></i>
              </span>
            </li>

            {tasks.map((task) => (
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
