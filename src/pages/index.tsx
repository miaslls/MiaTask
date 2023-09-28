import styles from '@/styles/home.module.css';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>
          MiaTask - Simple Task Management | Organize, Update, and Complete Tasks Effortlessly
        </title>
      </Head>
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
    </>
  );
}
