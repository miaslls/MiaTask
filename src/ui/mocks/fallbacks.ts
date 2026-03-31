import type { ChangeEvent, MutableRefObject } from 'react';

import type { UiTask } from '../types';

// Shared no-op for optional callbacks in isolated UI previews.
export const noop = () => {};

// Shared no-op input handler for standalone form rendering.
export const noopInputChange = (_event: ChangeEvent<HTMLInputElement>) => {};

// Shared fallback task keeps components renderable without external data.
export const fallbackTask: UiTask = {
  id: 'task-fallback',
  text: 'Sample task',
  completed: false,
  starred: false,
  dateStringShort: 'Tue, 03/31',
  dateStringLong: 'Tuesday, 03/31/26',
  timeString: '10:15am',
};

export const fallbackElementRef = {
  current: null,
} as MutableRefObject<HTMLElement | null>;

