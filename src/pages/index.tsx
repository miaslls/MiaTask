import styles from '@/styles/home.module.css';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
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

        <main>main</main>

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
