import styles from './styles/modal.module.css';
import { useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
import useFocusTrapping from '@hooks/useFocusTrapping';

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

export type ModalProps = {
  title: string;
  children: React.JSX.Element;
  closeModal(): void;
};

export default function Modal({ title, children, closeModal }: ModalProps) {
  const { t } = useTranslation('common');

  const modalRef = useRef<HTMLDivElement | null>(null);

  useFocusTrapping({ elementRef: modalRef, escapeHatchFunc: closeModal });

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
        <div className={styles.title}>{t(`modal-${title}`)}</div>

        <button
          className={styles.close}
          onClick={(e) => handleClick(e, { canClose: true })}
          aria-label={t('a11y:aria.label.modal-close')}
          title={t('a11y:title.close')}
        >
          <i className="ri-close-line"></i>
        </button>

        <div className={styles.content}>{children}</div>
      </div>
    </Overlay>
  );
}
