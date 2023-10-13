import styles from './styles/modal.module.css';
import React, { useEffect, useRef } from 'react';

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
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      // const queryString =
      // 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"], [contenteditable]'; // NOT FUNCTIONAL (needs type mapping maybe?)

      const focusableElements = modalElement.querySelectorAll('button');

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      const handleTabKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          // SHIFT + TAB
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              e.preventDefault();
              lastFocusable.focus();
            }

            // TAB
          } else {
            if (document.activeElement === lastFocusable) {
              e.preventDefault();
              firstFocusable.focus();
            }
          }
        }
      };

      const handleEscapeKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      };

      modalElement.addEventListener('keydown', handleTabKeyPress);
      modalElement.addEventListener('keydown', handleEscapeKeyPress);

      return () => {
        modalElement.removeEventListener('keydown', handleTabKeyPress);
        modalElement.removeEventListener('keydown', handleEscapeKeyPress);
      };
    }
  }, [closeModal]);

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
      <div
        className={styles.container}
        onClick={(e) => handleClick(e, { canClose: false })}
        ref={modalRef}
      >
        <div className={styles.title}>{title}</div>

        <button
          className={styles.close}
          onClick={(e) => handleClick(e, { canClose: true })}
          aria-label="Close modal"
          title="Close"
        >
          <i className="ri-close-line"></i>
        </button>

        <div className={styles.content}>{children}</div>
      </div>
    </Overlay>
  );
}
