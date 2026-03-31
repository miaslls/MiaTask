import { useEffect } from 'react';

// Keeps keyboard focus inside modal/form containers in the isolated UI layer.
export default function useFocusTrapping({
  elementRef,
  escapeHatchFunc,
}: {
  elementRef: React.MutableRefObject<HTMLElement | null>;
  escapeHatchFunc(): void;
}) {
  useEffect(() => {
    const queryString =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

    const element = elementRef.current;

    if (!element) {
      return;
    }

    let focusableElements: NodeListOf<Element>;
    let initialPageFocus: Element | null;

    try {
      focusableElements = element.querySelectorAll(queryString);
      initialPageFocus = document.querySelector(queryString);
    } catch (error) {
      console.error('Invalid focus-trap selector.', error);
      return;
    }

    if (focusableElements.length === 0) {
      return;
    }

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (
      !(firstFocusable instanceof HTMLElement) ||
      !(lastFocusable instanceof HTMLElement) ||
      (initialPageFocus !== null && !(initialPageFocus instanceof HTMLElement))
    ) {
      console.error('Found element(s) not HTML Element(s)');
      return;
    }

    if (firstFocusable === lastFocusable) {
      firstFocusable.focus();
    }

    const handleTabKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
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
        if (initialPageFocus instanceof HTMLElement) {
          initialPageFocus.focus();
        }

        escapeHatchFunc();
      }
    };

    element.addEventListener('keydown', handleTabKeyPress);
    element.addEventListener('keydown', handleEscapeKeyPress);

    return () => {
      element.removeEventListener('keydown', handleTabKeyPress);
      element.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, [escapeHatchFunc, elementRef]);
}
