import styles from './styles/footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <Link className="text_link" href="https://github.com/miaslls" target="_blank" tabIndex={0}>
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
        tabIndex={0}
      >
        font
      </Link>

      <span className={styles.separator_icon}>
        <i className="ri-infinity-line"></i>
      </span>

      <Link className="text_link" href="https://remixicon.com" target="_blank" tabIndex={0}>
        icons
      </Link>
    </footer>
  );
}
