import styles from './styles/header.module.css';

export default function Header({
  showForm,
  handleForm,
}: {
  showForm: boolean;
  handleForm(): void;
}) {
  return (
    <header>
      <div className={styles.title}>
        <div className={styles.title_logo}>
          <i className="ri-list-check-3"></i>
        </div>

        <h1>
          Mia<span>Task</span>
        </h1>
      </div>

      <div className={styles.add_icon} onClick={handleForm}>
        <i className={showForm ? 'ri-close-circle-line' : 'ri-add-circle-line'}></i>
      </div>
    </header>
  );
}
