import styles from './styles/modal.module.css';
import React, { useEffect } from 'react';

function Overlay({
  children,
  overlayClick,
}: {
  children: React.JSX.Element;
  overlayClick(): void;
}) {
  return (
    <div className={styles.overlay} onClick={overlayClick}>
      {children}
    </div>
  );
}

export default function Modal({
  title,
  children,
  closeModal,
}: {
  title: string;
  children: React.JSX.Element;
  closeModal(): void;
}) {
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    };

    document.addEventListener('keydown', (e) => keyDownHandler(e));

    return () => {
      document.removeEventListener('keydown', (e) => keyDownHandler(e));
    };
  }, []);

  const handleClick = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    { canClose }: { canClose: boolean },
  ) => {
    e.stopPropagation();
    if (canClose) {
      closeModal();
    }
  };

  return (
    <Overlay overlayClick={closeModal}>
      <div className={styles.container} onClick={(e) => handleClick(e, { canClose: false })}>
        <div className={styles.title}>{title}</div>

        <button
          className={styles.close}
          onClick={(e) => handleClick(e, { canClose: true })}
          aria-label="Close modal"
        >
          <i className="ri-close-line"></i>
        </button>

        <div className={styles.content}>{children}</div>
      </div>
    </Overlay>
  );
}
