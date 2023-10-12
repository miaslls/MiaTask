import styles from './styles/modal.module.css';
import React from 'react';

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
  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
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

        <div className={styles.close} onClick={(e) => handleClick(e, { canClose: true })}>
          <i className="ri-close-line"></i>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </Overlay>
  );
}
