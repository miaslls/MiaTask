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
        </Link>

        <i className="ri-external-link-line"></i>
      </span>
      ৹
      <span className={styles.footer_link}>
        <Link
          className="text_link"
          href="https://fonts.google.com/specimen/Roboto+Mono"
          target="_blank"
          title="External link: Font-family used in the project: Google's Roboto Mono"
        >
          font
        </Link>

        <i className="ri-external-link-line"></i>
      </span>
      ৹
      <span className={styles.footer_link}>
        <Link
          className="text_link"
          href="https://remixicon.com"
          target="_blank"
          title="External link: Icon system used in the project: Remix Icon"
        >
          icons
        </Link>

        <i className="ri-external-link-line"></i>
      </span>
    </footer>
  );
}
