import React, { useEffect } from 'react';

export function useFocusTrapping({
  elementRef,
  escapeHatchFunc,
}: {
  elementRef: React.MutableRefObject<HTMLElement | null>;
  escapeHatchFunc(): void;
}) {
  useEffect(() => {
    const queryString =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"], [contenteditable]';

    const element = elementRef.current;

    if (element) {
      const focusableElements = element.querySelectorAll(queryString);

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      const initialPageFocus = document.querySelector(queryString);

      if (
        !(firstFocusable instanceof HTMLElement) ||
        !(lastFocusable instanceof HTMLElement) ||
        !(initialPageFocus instanceof HTMLElement)
      ) {
        console.error('Found element(s) not HTML Element(s)');

        return;
      }

      if (firstFocusable === lastFocusable) {
        firstFocusable.focus();
      }

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
          if (initialPageFocus) {
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
    }
  }, [escapeHatchFunc, elementRef]);
}
