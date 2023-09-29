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

        <main>
          <ul className={styles.tasklist}>
            <li className={`${styles.task} ${styles.task_input_wrapper}`}>
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

            <li className={`${styles.task} ${styles.task_starred}`}>
              <div className={styles.task_icons}>
                <div className={styles.task_icon}>
                  <i className="ri-checkbox-blank-line"></i>
                </div>
                <div className={styles.task_icon}>
                  <i className="ri-more-2-fill"></i>
                </div>
              </div>

              <div className={styles.task_title}>twinkle twinkle little star</div>

              <div className={styles.task_icon}>
                <i className="ri-star-fill"></i>
              </div>
            </li>

            <li className={styles.task}>
              <div className={styles.task_icons}>
                <div className={styles.task_icon}>
                  <i className="ri-checkbox-blank-line"></i>
                </div>
                <div className={styles.task_icon}>
                  <i className="ri-more-2-fill"></i>
                </div>
              </div>

              <div className={styles.task_options}>
                <div className={styles.task_icon}>
                  <i className="ri-edit-line"></i>
                </div>
                <div className={styles.task_icon}>
                  <i className="ri-delete-bin-2-line"></i>
                </div>
                <div className={styles.task_icon}>
                  <i className="ri-star-line"></i>
                </div>
              </div>

              <div className={styles.task_title}>task with options open</div>
            </li>

            <li className={styles.task}>
              <div className={styles.task_icons}>
                <div className={styles.task_icon}>
                  <i className="ri-checkbox-blank-line"></i>
                </div>
                <div className={styles.task_icon}>
                  <i className="ri-more-2-fill"></i>
                </div>
              </div>

              <div className={styles.task_title}>plain ol&apos; regular task</div>
            </li>

            <li className={`${styles.task} ${styles.task_completed}`}>
              <div className={styles.task_icons}>
                <div className={styles.task_icon}>
                  <i className="ri-checkbox-line"></i>
                </div>
                <div className={styles.task_icon}>
                  <i className="ri-more-2-fill"></i>
                </div>
              </div>

              <div className={styles.task_title}>completed task, good job!</div>
            </li>
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
