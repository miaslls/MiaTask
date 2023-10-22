import styles from './styles/footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <span className={styles.footer_link}>
        <Link
          className="text_link"
          href="https://github.com/miaslls"
          target="_blank"
          title="External link: Author's Github page"
        >
          @miaslls
          <i className="ri-external-link-line"></i>
        </Link>
      </span>
      ৹
      <span className={styles.footer_link}>
        <Link
          className="text_link"
          href="https://fonts.google.com/specimen/Roboto+Mono"
          target="_blank"
          title="External link: Roboto Mono"
        >
          font
          <i className="ri-external-link-line"></i>
        </Link>
      </span>
      ৹
      <span className={styles.footer_link}>
        <Link
          className="text_link"
          href="https://remixicon.com"
          target="_blank"
          title="External link: Remix Icon"
        >
          icons
          <i className="ri-external-link-line"></i>
        </Link>
      </span>
    </footer>
  );
}
